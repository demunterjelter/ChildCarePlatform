import { Child } from './child';
export class Customer {
    id?: number;
    name: string;
    address: string;
    mail: string;
    phoneNumber: string;
    children?: Child[];
    comment: string;
}
