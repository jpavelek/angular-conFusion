import { Comment } from './comment';

export class Dish {
    name: string;
    image: string; //URL for image
    category: string;
    label: string;
    price: string;
    description: string;
    comments: Comment[];
}