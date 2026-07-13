import  AccountType from "../enums/AccountType";
import  Account from "../models/Account";
import  Customer from "../models/Customer";
import TransactionService from "./TransactionService";
import TransactionType from "../enums/TransactionType";

class AccountService {
    private accounts: Account[] = [];
    private transactionService: TransactionService;
    constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
}

    openAccount(
    customer: Customer,
    accountType: AccountType,
    initialBalance: number
): Account {
    

    if (initialBalance < 0) {
        throw new Error("Initial balance cannot be negative.");
    }

    const account = new Account(
        customer,
        accountType,
        initialBalance
    );

    this.accounts.push(account);

    return account;
}

    getAllAccounts(): Account[] {
    return this.accounts;
}

    findAccount(accountNumber: number): Account | undefined {
    return this.accounts.find(
        account => account.accountNumber === accountNumber
    );
}

    deposit(accountNumber: number, amount: number): boolean {
    const account = this.findAccount(accountNumber);

    if (!account) {
        return false;
    }

    if (amount <= 0) {
        throw new Error("Deposit amount must be greater than zero.");
    }

    account.balance += amount;
    this.transactionService.addTransaction(
    account,
    TransactionType.DEPOSIT,
    amount
);

    return true;
}

    withdraw(accountNumber: number, amount: number): boolean {
    const account = this.findAccount(accountNumber);

    if (!account) {
        return false;
    }

    if (amount <= 0) {
        throw new Error("Withdrawal amount must be greater than zero.");
    }

    if (account.balance < amount) {
        throw new Error("Insufficient balance.");
    }

    account.balance -= amount;
    this.transactionService.addTransaction(
    account,
    TransactionType.WITHDRAW,
    amount
);

    return true;
}

    transfer(
    fromAccountNumber: number,
    toAccountNumber: number,
    amount: number
): boolean {

    const fromAccount = this.findAccount(fromAccountNumber);
    const toAccount = this.findAccount(toAccountNumber);

    if (!fromAccount || !toAccount) {
        return false;
    }

    if (fromAccountNumber === toAccountNumber) {
        throw new Error("Cannot transfer to the same account.");
    }

    if (amount <= 0) {
        throw new Error("Transfer amount must be greater than zero.");
    }

    if (fromAccount.balance < amount) {
        throw new Error("Insufficient balance.");
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;
    this.transactionService.addTransaction(
    fromAccount,
    TransactionType.TRANSFER,
    amount
);

this.transactionService.addTransaction(
    toAccount,
    TransactionType.TRANSFER,
    amount
);

    return true;
}
}

export default AccountService;