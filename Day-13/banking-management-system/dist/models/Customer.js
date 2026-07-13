"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    id;
    firstName;
    lastName;
    phoneNumber;
    email;
    dob;
    address;
    isActive;
    constructor(id, firstName, lastName, phoneNumber, email, dob, address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dob = dob;
        this.address = address;
        this.isActive = true;
    }
}
exports.default = Customer;
