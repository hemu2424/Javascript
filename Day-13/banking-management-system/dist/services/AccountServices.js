"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("../models/Account"));
const TransactionType_1 = __importDefault(require("../enums/TransactionType"));
class AccountService {
    accounts = [];
    transactionService;
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    openAccount(customer, accountType, initialBalance) {
        if (initialBalance < 0) {
            throw new Error("Initial balance cannot be negative.");
        }
        const account = new Account_1.default(customer, accountType, initialBalance);
        this.accounts.push(account);
        return account;
    }
    getAllAccounts() {
        return this.accounts;
    }
    findAccount(accountNumber) {
        return this.accounts.find(account => account.accountNumber === accountNumber);
    }
    deposit(accountNumber, amount) {
        const account = this.findAccount(accountNumber);
        if (!account) {
            return false;
        }
        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than zero.");
        }
        account.balance += amount;
        this.transactionService.addTransaction(account, TransactionType_1.default.DEPOSIT, amount);
        return true;
    }
    withdraw(accountNumber, amount) {
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
        this.transactionService.addTransaction(account, TransactionType_1.default.WITHDRAW, amount);
        return true;
    }
    transfer(fromAccountNumber, toAccountNumber, amount) {
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
        this.transactionService.addTransaction(fromAccount, TransactionType_1.default.TRANSFER, amount);
        this.transactionService.addTransaction(toAccount, TransactionType_1.default.TRANSFER, amount);
        return true;
    }
}
exports.default = AccountService;
