import { Category } from "./category";

export class Product {
    constructor(
        public id: number,
        public name: string,
        public quantityInStock: number,
        public lowLimitAlert: number,
        public productUnit: string,
        public category?: Category
    ){}
}
