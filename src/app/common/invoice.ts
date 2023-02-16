import { ClientVendor } from "./client-vendor";
import { Company } from "./company";
import { InvoiceProduct } from "./invoice-product";

export class Invoice {

    constructor(
        public id?: number,
        public invoiceNo?: string,
        public invoiceStatus?: string,
        public invoiceType?: string,
        public date?: Date,
        public company?: Company,
        public clientVendor?: ClientVendor,
        public price?: number,
        public tax?: number,
        public total?: number,
        public invoiceProducts?: InvoiceProduct[]
    ){}
}
