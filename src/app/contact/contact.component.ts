import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers-browserify';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }
  feedback_handle: Feedback;
  feedback_prev = false;

  validationMessages = {
    'firstname': {
      'required': "First name is required",
      'minlength': "First name must be at least 2 characters long",
      'maxlength': "Fist name cannot be more than 25 characters long"
    },
    'lastname': {
      'required': "Last name is required",
      'minlength': "Last name must be at least 2 characters long",
      'maxlength': "Last name cannot be more than 25 characters long"
    },
    'telnum': {
      'required': "Telephone number is required",
      'pattern': "Telephone number shall contain only numbers"
    },
    'email': {
      'required': "Email is required",
      'email': "Email not in valid format"
    }
  };

  constructor(private fb: FormBuilder,
      private feedbackservice: FeedbackService) {
    this.createForm();
   }

  ngOnInit() {
    this.feedback_handle = new Feedback();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // To set/reset form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return }

    const form = this.feedbackForm;
    for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + " ";
          }
        }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;  // They have same structure, no need to copy values by one

    this.feedback_handle = null;
    this.feedbackservice.submitFeedback(this.feedback)
    .subscribe(feedback => { 
      this.feedback_handle = feedback; 
      this.feedback_prev = true;
      var self = this;
      setTimeout( function() {
        self.feedback_prev = false;
      }, 5000)});

    this.feedbackForm.reset({
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: false,
      contacttype: "None",
      message: ""
    });
  }
}
