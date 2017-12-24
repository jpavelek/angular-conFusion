import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy = null;  //This will be Restangularized Dish copy
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  errMsg: string;
  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
     'author': {
      'required': "Author of comment is required",
      'minlength': "Author name must be at least 2 characters long",
      'maxlength': "Author name cannot be more than 25 characters long"
     },
     'comment': {
       'required': 'Comment is required'
     }
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm(); //In onOnInit() instead?
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';}, errmsg => this.errMsg = <any>errmsg)
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
      rating:  [5, Validators.required]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // To set/reset form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return }

    for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = this.commentForm.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + " ";
          }
        }
    }
  }

  onSubmit() {
    let newComment:Comment = this.commentForm.value;
    let d = new Date().toISOString();

    this.dishcopy.comments.push({
      author: newComment.author,
      comment: newComment.comment,
      rating: newComment.rating,
      date: d
    });
    this.dishcopy.save()
      .subscribe(dish => this.dish = dish); //Save (and update UI) only when saved on server
    this.commentForm.reset({
      author: "",
      comment: "",
      score: 5
    });
  }
}
