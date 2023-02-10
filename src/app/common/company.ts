import { Address } from "./address";

export class Company {
    constructor(public id: number,
                public title: string,
                public phone: string,
                public website: string,
                public companyStatus: string,
                public address: Address
                ){}
}
