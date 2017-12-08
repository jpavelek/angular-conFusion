import { Comment } from './comment';

export class Dish {
    id: number;
    name: string;
    image: string; //URL for image
    category: string;
    label: string;
    price: string;
    featured: boolean;
    description: string;
    comments: Comment[];
}