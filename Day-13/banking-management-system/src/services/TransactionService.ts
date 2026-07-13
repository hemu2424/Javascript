import Transaction from "../models/Transaction"
import TransactionType  from "../enums/TransactionType"; 
import Account from "../models/Account"
class TransactionService{
    private transactions : Transaction[] = []
addTransaction(
    account: Account,
    transactionType: TransactionType,
    amount: number
): Transaction {
    const transaction = new Transaction(
        account,
        transactionType,
        amount
    );

    this.transactions.push(transaction);

    return transaction;
}
getTransactionsByAccount(accountNumber: number): Transaction[] {
    return this.transactions.filter(
        transaction => transaction.account.accountNumber === accountNumber
    );
}
getTransactionById(transactionId: number): Transaction | undefined {
    return this.transactions.find(
        transaction => transaction.transactionId === transactionId
    );
}
}
export default TransactionService;