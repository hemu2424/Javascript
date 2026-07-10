class Book {
    constructor(id, title, author, isbn, category, totalCopies) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.category = category;
    this.totalCopies = totalCopies;
    

    this.availableCopies = totalCopies;
    this.borrowCount = 0;

    
}

updateDetails(updateData){
const allowedFields = ['title', 'author', 'isbn', 'category'];

for (const key in updateData) {
    if (allowedFields.includes(key)) {
        if (key === 'isbn' && !this.validateISBN(updateData[key])) {
            console.error("Invalid ISBN format.");
            return false;
        }
        if (key === 'author' && !this.validateAuthor(updateData[key])) {
            console.error("Invalid author name format.");
            return false;
        }
        if (key === 'title' && !this.validateTitle(updateData[key])) {
            console.error("Invalid title format.");
            return false;
        }
        this[key] = updateData[key];
    } else {
        console.warn(`Field "${key}" is not allowed to be updated.`);
    }
}
return true;
}
increaseCopies(copies)
{
    if(copies<=0 || !Number.isInteger(copies)){
        console.error("Invalid number of copies. Please enter a positive integer.");
        return false;
    }

    this.totalCopies += copies;
    this.availableCopies += copies;
    return true;
}
decreaseCopies(copies)
{
    if(copies<=0 || !Number.isInteger(copies)){
        console.error("Invalid number of copies. Please enter a positive integer.");
        return false;
    }
    if(copies>this.availableCopies){
        console.error(
    `Cannot remove ${copies} copies. Only ${this.availableCopies} copies are available.`
);
        return false;
    }
    this.totalCopies -= copies;
    this.availableCopies -= copies;
    return true;
}
displayInfo() {
    const {
    id,
    title,
    author,
    isbn,
    category,
    totalCopies,
    availableCopies,
    borrowCount
} = this;
    return {
    id,
    title,
    author,
    isbn,
    category,
    totalCopies,
    availableCopies,
    borrowCount
};
}
validateISBN(isbn)
 {
     if(typeof isbn !== "string"){
    return false;
}
    if(isbn.trim() === '' || !/^\d{10}(\d{3})?$/.test(isbn)) {
        return false;
    }
   
    return true;
    
}

    validateAuthor(author) {
    if (typeof author !== "string") {
        return false;
    }

    if (author.trim() === "") {
        return false;
    }

    return true;
}
    validateTitle(title)
    {
        if (typeof title !== 'string' || title.trim() === '' || title.length > 100 || title.length < 2) {
            return false;
        }
return true;

    }
    borrow(){
    if(this.availableCopies <= 0){
        return false;
    }

    this.availableCopies--;
    this.borrowCount++;

    return true;
}
returnBook() {
    if (this.availableCopies >= this.totalCopies) {
        console.error("All copies are already in the library.");
        return false;
    }

    this.availableCopies++;
    return true;
}

}

class Library {
    constructor(){
        this.books = [];
        this.members = [];
        this.transactions = [];
        this.bookById = new Map()
        this.bookByISBN = new Map();

        this.memberById = new Map();
this.memberByEmail = new Map();

this.transactionById = new Map();

        
    }

    addBook(newBook) {
        if(!(newBook instanceof Book)){
            console.error("Invalid book object.");
            return false;
        }
      
        if (this.bookById.has(newBook.id)) {
            console.error("Book with this ID already exists.");
            return false;
        }
        if (this.bookByISBN.has(newBook.isbn)) {
            console.error("Book with this ISBN already exists.");
            return false;
        }
        this.books.push(newBook);
        this.bookById.set(newBook.id,newBook)
        this.bookByISBN.set(newBook.isbn,newBook)
        return true;
    }

    removeBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            console.error("Book not found.");
            return false;
        }
        const book = this.books[index];
        if(book.availableCopies === book.totalCopies) {
            console.log("Removing book:", this.books[index].title);
            // If all copies are available, allow removal
        
        
        this.books.splice(index, 1);
        this.bookById.delete(book.id)
        this.bookByISBN.delete(book.isbn)
        return true;
    }
    else{
        console.error("Cannot remove book. Some copies are currently borrowed.");
        return false;
    }
}
getBookById(id){
    if(!Number.isInteger(id) || id <= 0){
        console.error("Invalid book ID. Please enter a positive integer.");
        return null;
    }
    const book = this.bookById.get(id);
    if(!book){
        console.error("Book not found.");
        return null;
    }
    return book;
}
getBookByISBN(isbn){
    if (typeof isbn !== "string") {
    console.error("Invalid ISBN.");
    return null;
}
    if(isbn.trim() === '' || !/^\d{10}(\d{3})?$/.test(isbn)) {
        console.error("Invalid ISBN format.");
        return null;
    }
    const book = this.bookByISBN.get(isbn);
    if(!book){
        console.error("Book not found.");
        return null;
    }
    return book;
}

searchBooksByTitle(title) {
    if (typeof title !== "string") {
        console.error("Invalid title format.");
        return [];
    }

    const query = title.trim().toLowerCase();

    if (query === "") {
        return [];
    }

    return this.books.filter(book =>
        book.title
            .trim()
            .toLowerCase()
            .includes(query)
    );
}
searchBooksByAuthor(author) {
    if (typeof author !== "string") {
        console.error("Invalid author format.");
        return [];
    }
    const query = author.trim().toLowerCase();
    if (query === "") {
        return [];
    }
    return this.books.filter(book =>
        book.author
            .trim()
            .toLowerCase()
            .includes(query)
    );

}
searchBooksByCategory(category) {
    if (typeof category !== "string") {
        console.error("Invalid category format.");
        return [];
    }
    const query = category.trim().toLowerCase();
    if (query === "") {
        return [];
    }
    return this.books.filter(book =>
        book.category
            .trim()
            .toLowerCase()
            .includes(query)
    );}

    updateBook(id, updateData) {
        if (typeof updateData !== "object" || updateData === null) {
    console.error("Invalid update data.");
    return false;
}
    if(!Number.isInteger(id) || id <= 0) {
        console.error("Invalid book ID. Please enter a positive integer.");
        return false;
    }
    const book = this.bookById.get(id); 
    if(!book){
        console.error("Book Not Found");
        return false;
    }
    if(updateData.isbn){
    const existingBook = this.bookByISBN.get(updateData.isbn);
    if (existingBook && existingBook.id !== id) {
    console.error("ISBN already exists.");
    return false;
}}
const oldISBN = book.isbn;
const updated = book.updateDetails(updateData);
if(!updated){
    return false;
}
if (oldISBN !== book.isbn) {
    this.bookByISBN.delete(oldISBN);
    this.bookByISBN.set(book.isbn, book);
}
return true;
}

displayAllBooks() {
    return this.books.map(book => book.displayInfo());
}

borrowBook(memberId, bookId) {
    const member = this.memberById.get(memberId);

    if (!member) {
        console.error("Member not found.");
        return false;
    }

    const book = this.bookById.get(bookId);

    if (!book) {
        console.error("Book not found.");
        return false;
    }

    if (book.availableCopies <= 0) {
        console.error("No available copies.");
        return false;
    }

    if (!member.canBorrow(bookId)) {
        console.error("Member cannot borrow this book.");
        return false;
    }

    if (!book.borrow()) {
    return false;
}


    member.borrowBook(bookId);

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    const transaction = new Transaction(
        this.transactions.length + 1,
        memberId,
        bookId,
        borrowDate,
        dueDate
    );

    this.transactions.push(transaction);
    this.transactionById.set(transaction.id, transaction);

    console.log("Book borrowed successfully.");

    return true;
}

returnBook(memberId, bookId){
    const member = this.memberById.get(memberId);

    if (!member) {
        console.error("Member not found.");
        return false;
    }

    const book = this.bookById.get(bookId);

    if (!book) {
        console.error("Book not found.");
        return false;
    }
    if (!member.borrowedBooks.includes(bookId)) {
    console.error("This member didn't borrow this book.");
    return false;
}
    
    const transaction = this.transactions.find(transaction =>
        transaction.memberId === memberId &&
        transaction.bookId === bookId &&
        transaction.status === "BORROWED"
    );

    if (!transaction) {
        console.error("Active transaction not found.");
        return false;
    }
    transaction.markAsReturned();
if (!book.returnBook()) {
    return false;
}

member.removeBorrowedBook(bookId);
console.log("Book returned successfully.");
return true;

}


addMember(member) {
    if (!(member instanceof Member)) {
        console.error("Invalid member object.");
        return false;
    }

    if (this.memberById.has(member.id)) {
        console.error("Member with this ID already exists.");
        return false;
    }

    if (this.memberByEmail.has(member.email)) {
        console.error("Member with this email already exists.");
        return false;
    }

    this.members.push(member);
    this.memberById.set(member.id, member);
    this.memberByEmail.set(member.email, member);

    console.log("Member added successfully.");
    return true;
}
updateMember(id, updateData) {
    if (typeof updateData !== "object" || updateData === null) {
    console.error("Invalid update data.");
    return false;
}

    if (!Number.isInteger(id) || id <= 0) {
        console.error("Invalid Member ID.");
        return false;
    }

    const member = this.memberById.get(id);

    if (!member) {
        console.error("Member not found.");
        return false;
    }

    if (updateData.email) {
        const existingMember = this.memberByEmail.get(updateData.email);

        if (existingMember && existingMember.id !== id) {
            console.error("Email already exists.");
            return false;
        }
    }

    const oldEmail = member.email;

    const updated = member.updateDetails(updateData);

    if (!updated) {
        return false;
    }

    if (oldEmail !== member.email) {
        this.memberByEmail.delete(oldEmail);
        this.memberByEmail.set(member.email, member);
    }

    console.log("Member updated successfully.");
    return true;
}
removeMember(id) {

    if (!Number.isInteger(id) || id <= 0) {
        console.error("Invalid Member ID.");
        return false;
    }

    const member = this.memberById.get(id);

    if (!member) {
        console.error("Member not found.");
        return false;
    }

    if (member.borrowedBooks.length > 0) {
        console.error("Cannot remove member. Books are still borrowed.");
        return false;
    }

    const index = this.members.findIndex(m => m.id === id);

    this.members.splice(index, 1);

    this.memberById.delete(id);
    this.memberByEmail.delete(member.email);

    console.log("Member removed successfully.");
    return true;
}
getMemberById(id) {

    if (!Number.isInteger(id) || id <= 0) {
        console.error("Invalid Member ID.");
        return null;
    }

    const member = this.memberById.get(id);

    if (!member) {
        console.error("Member not found.");
        return null;
    }

    return member;
}
displayAllMembers() {
    return this.members.map(member => member.displayInfo());
}
displayAllTransactions() {
    return this.transactions.map(transaction => transaction.displayInfo());
}
getTransactionById(id) {
    const transaction = this.transactionById.get(id);

if (!transaction) {
    console.error("Transaction not found.");
    return null;
}

return transaction;

}

}

class Member{
    constructor(id,name,email,phone,borrowedBooks,maxBorrowLimit){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.borrowedBooks = borrowedBooks || [];
        this.maxBorrowLimit = maxBorrowLimit ?? 5;
    }
    updateDetails(updateData){
    const allowedFields = ['name', 'email', 'phone'];

    for (const key in updateData) {

        if (allowedFields.includes(key)) {

            if (key === 'email' && !this.validateEmail(updateData[key])) {
                console.error("Invalid email format.");
                return false;
            }

            if (key === 'phone' && !this.validatePhone(updateData[key])) {
                console.error("Invalid phone number format.");
                return false;
            }

            if (key === 'name' && !this.validateName(updateData[key])) {
                console.error("Invalid name format.");
                return false;
            }

           
            this[key] = updateData[key];

        } else {
            console.warn(`Field "${key}" is not allowed to be updated.`);
        }
    }

    return true;
}
validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
validatePhone(phone) {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
}
validateName(name){
    if(typeof name !== "string"){
        return false;
    }

    name = name.trim();

    if(name === ""){
        return false;
    }

    if(name.length < 2 || name.length > 50){
        return false;
    }

    if(!/^[a-zA-Z\s]+$/.test(name)){
        return false;
    }

    return true;
}
displayInfo(){
    const {
   id,
   name,
   email,
   phone,
   maxBorrowLimit
} = this;
return {
    id,
    name,
    email,
    phone,
    maxBorrowLimit,
    borrowedCount: this.borrowedBooks.length
}}
canBorrow(bookId){

    if(this.borrowedBooks.length >= this.maxBorrowLimit){
        return false;
    }

    if(this.borrowedBooks.includes(bookId)){
        return false;
    }

    return true;
}
removeBorrowedBook(bookId){

    const index = this.borrowedBooks.indexOf(bookId);

    if(index === -1){
        return false;
    }

    this.borrowedBooks.splice(index,1);

    return true;
}

borrowBook(bookId){
    this.borrowedBooks.push(bookId);
    return true;
}

}
class Transaction {
    constructor(
        id,memberId,bookId,borrowDate,dueDate
    ){
        this.id = id;
        this.memberId = memberId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = null;
this.status = "BORROWED";
    }

    markAsReturned(){

    if(this.status === "RETURNED"){
        console.error("Book is already returned.");
        return false;
    }

    this.status = "RETURNED";
    this.returnDate = new Date();

    console.log("Book returned successfully.");

    return true;
}
    isOverdue(){
        if(this.status === "RETURNED"){
            console.log("already returned")
            return false;
        }
        const today = new Date()
        if(today > this.dueDate){
            return true
        }
        else {return false}
    }

    displayInfo(){
        const {
    id,
    memberId,
    bookId,
    borrowDate,
    dueDate,
    returnDate,
    status
} = this;
return {
    id,memberId,bookId,borrowDate,dueDate,returnDate,status
}
    }

}
const library = new Library();