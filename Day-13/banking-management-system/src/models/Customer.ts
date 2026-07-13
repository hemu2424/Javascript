 class Customer {
    readonly id: number;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    dob: Date;
    address: string;
    isActive: boolean;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        phoneNumber: number,
        email: string,
        dob: Date,
        address: string
    ) {
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




export default Customer;

