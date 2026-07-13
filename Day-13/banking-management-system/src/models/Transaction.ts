import type TransactionType from "../enums/TransactionType";
import type Account from "./Account";


class Transaction {
    readonly transactionId:number;
    account:Account;
    transactionType:TransactionType;
    amount :number;
    date:Date;
    static nextTransactionId = 1;
    constructor(
        account:Account,
        transactionType:TransactionType,
        amount:number
    ){
        this.transactionId = Transaction.nextTransactionId++;
        this.account = account;
        this.date = new Date();
        this.amount = amount;
        this.transactionType =transactionType;
    }

}

export default Transaction