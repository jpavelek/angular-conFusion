import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES); //Works now for local data, rewrite forcommunications later
  };

  getDish(id: number): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); // Arrow notation of function declaration
  };

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);  // Arrow notation for boolean function
  };
}
