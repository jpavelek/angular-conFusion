import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  };

  getDish(id: number): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0]; // Arrow notation of function declaration
  };

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => (dish.featured))[0];  // Arrow notation for boolean function
  };
}
