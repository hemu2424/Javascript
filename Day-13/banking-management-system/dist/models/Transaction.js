"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    transactionId;
    account;
    transactionType;
    amount;
    date;
    static nextTransactionId = 1;
    constructor(account, transactionType, amount) {
        this.transactionId = Transaction.nextTransactionId++;
        this.account = account;
        this.date = new Date();
        this.amount = amount;
        this.transactionType = transactionType;
    }
}
exports.default = Transaction;
