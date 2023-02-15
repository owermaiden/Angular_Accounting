import { Address } from "./address";
import { Company } from "./company";

export class ClientVendor {
    constructor(
        public id: number,
        public clientVendorName: string,
        public phone: string,
        public website: string,
        public clientVendorType: string,
        public address: Address,
        public company: Company
    ){}
}
