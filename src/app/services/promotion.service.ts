import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Observable.of(PROMOTIONS).delay(200).toPromise();
  };

  getPromotion(id: number): Promise<Promotion> {
    return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000).toPromise();
  };

  getFeaturedPromotion(): Promise<Promotion> {
    return Observable.of(PROMOTIONS.filter((promo) => (promo.featured))[0]).delay(2000).toPromise();
  };

}
