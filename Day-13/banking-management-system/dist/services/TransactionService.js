"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../models/Transaction"));
class TransactionService {
    transactions = [];
    addTransaction(account, transactionType, amount) {
        const transaction = new Transaction_1.default(account, transactionType, amount);
        this.transactions.push(transaction);
        return transaction;
    }
    getTransactionsByAccount(accountNumber) {
        return this.transactions.filter(transaction => transaction.account.accountNumber === accountNumber);
    }
    getTransactionById(transactionId) {
        return this.transactions.find(transaction => transaction.transactionId === transactionId);
    }
}
exports.default = TransactionService;
