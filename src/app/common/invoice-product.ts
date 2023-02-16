import { Invoice } from "./invoice";
import { Product } from "./product";

export class InvoiceProduct {
    constructor(
        public id: number,
        public quantity: number,
        public price: number,
        public tax: number,
        public total: number,
        public profitLoss:number,
        public remainingQuantity: number,
        public invoice: Invoice,
        public product: Product 
    ){}
}
