import Customer from "./models/Customer";
import AccountType from "./enums/AccountType";

import CustomerService from "./services/CustomerService";
import AccountService from "./services/AccountServices";
import TransactionService from "./services/TransactionService";

const customerService = new CustomerService();
const transactionService = new TransactionService();
const accountService = new AccountService(transactionService);

const customer1 = new Customer(
    1,
    "Himanshu",
    "Poriya",
    9876543210,
    "himanshu@gmail.com",
    new Date("2004-05-10"),
    "Ahmedabad"
);

const customer2 = new Customer(
    2,
    "Rahul",
    "Sharma",
    9876543211,
    "rahul@gmail.com",
    new Date("2003-08-20"),
    "Surat"
);
console.log("Application Started");

customerService.addCustomer(customer1);
customerService.addCustomer(customer2);




console.log("Customers");

// --------------------
// Open Accounts
// --------------------

const account1 = accountService.openAccount(
    customer1,
    AccountType.SAVINGS,
    10000
);

const account2 = accountService.openAccount(
    customer2,
    AccountType.CURRENT,
    5000
);

console.log("\nAccounts");
console.log(accountService.getAllAccounts());

// --------------------
// Deposit
// --------------------

accountService.deposit(account1.accountNumber, 2000);

// --------------------
// Withdraw
// --------------------

accountService.withdraw(account2.accountNumber, 1000);

// --------------------
// Transfer
// --------------------

accountService.transfer(
    account1.accountNumber,
    account2.accountNumber,
    3000
);

// --------------------
// Final Account Details
// --------------------

console.log("\nFinal Accounts");
console.log(accountService.getAllAccounts());

// --------------------
// Transactions
// --------------------

console.log("\nTransactions");

// --------------------
// Account 1 Transactions
// --------------------

console.log("\nAccount 1 Transactions");
console.log(
    transactionService.getTransactionsByAccount(
        account1.accountNumber
    )
);

// --------------------
// Find Customer
// --------------------

console.log("\nFind Customer");
console.log(customerService.findCustomerById(1));

// --------------------
// Find Account
// --------------------

console.log("\nFind Account");
console.log(accountService.findAccount(account2.accountNumber));