import type AccountType from "../enums/AccountType";
import type Customer from "./Customer";


 class Account {
    readonly accountNumber: number;
    customer: Customer;
    accountType: AccountType;
    balance: number;
    isActive: boolean;

    static nextAccountNumber = 1001;

    constructor(
        customer: Customer,
        accountType: AccountType,
        balance: number
    ) {
        this.accountNumber = Account.nextAccountNumber++;
        this.customer = customer;
        this.accountType = accountType;
        this.balance = balance;
        this.isActive = true;
    }
}

export default Account