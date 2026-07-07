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
    if(isbn.trim() === '' || !/^\d{10}(\d{3})?$/.test(isbn)) {
        return false;
    }
    return true;
}
    validateAuthor(author)
    {
        if ( author.trim() === '') {
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

}

class Library {
    constructor(){
        this.books = [];
        this.members = [];
        this.transactions = [];
    }

    addBook(newBook) {
        if(!(newBook instanceof Book)){
            console.error("Invalid book object.");
            return false;
        }
      
        if (this.books.some(book => book.id === newBook.id)) {
            console.error("Book with this ID already exists.");
            return false;
        }
        if (this.books.some(book => book.isbn === newBook.isbn)) {
            console.error("Book with this ISBN already exists.");
            return false;
        }
        this.books.push(newBook);
        return true;
    }

    removeBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            console.error("Book not found.");
            return false;
        }
        this.books.splice(index, 1);
        return true;
    }
}