import Customer from "../models/Customer";

class CustomerService{
private customers : Customer[] = []

addCustomer(customer: Customer): void {
    const customerExists = this.customers.some(
        existingCustomer =>
            existingCustomer.email === customer.email ||
            existingCustomer.phoneNumber === customer.phoneNumber
    );

    if (customerExists) {
        throw new Error("Customer already exists.");
    }

    this.customers.push(customer);
    console.log("Customer added:", customer.firstName);
}
findCustomerById(id:number):Customer | undefined{
    const customer  = this.customers.find(customer => customer.id === id);
    if(!customer){
        throw new Error("customer does not exist")
    }
     return customer





}
getallCustomer(): Customer[]{
    if(this.customers === null){
        throw new Error("not a single customer exist")
    }
    return this.customers

}
deleteCustomer(id: number): boolean {
    const customerIndex = this.customers.findIndex(
        customer => customer.id === id
    );

    if (customerIndex === -1) {
        return false;
    }

    this.customers.splice(customerIndex, 1);

    return true;
}

}
export default CustomerService;