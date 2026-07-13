"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    accountNumber;
    customer;
    accountType;
    balance;
    isActive;
    static nextAccountNumber = 1001;
    constructor(customer, accountType, balance) {
        this.accountNumber = Account.nextAccountNumber++;
        this.customer = customer;
        this.accountType = accountType;
        this.balance = balance;
        this.isActive = true;
    }
}
exports.default = Account;
