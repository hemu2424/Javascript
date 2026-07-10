"use strict";



const bookIdInput = document.getElementById("bookId");
const bookTitleInput = document.getElementById("bookTitle");
const bookAuthorInput = document.getElementById("bookAuthor");
const bookISBNInput = document.getElementById("bookISBN");
const bookCategoryInput = document.getElementById("bookCategory");
const bookCopiesInput = document.getElementById("bookCopies");

const memberIdInput = document.getElementById("memberId");
const memberNameInput = document.getElementById("memberName");
const memberEmailInput = document.getElementById("memberEmail");
const memberPhoneInput = document.getElementById("memberPhone");

const borrowMemberIdInput = document.getElementById("borrowMemberId");
const borrowBookIdInput = document.getElementById("borrowBookId");

const returnMemberIdInput = document.getElementById("returnMemberId");
const returnBookIdInput = document.getElementById("returnBookId");

const searchInput = document.getElementById("searchInput");
const searchType = document.getElementById("searchType");

const addBookBtn = document.getElementById("addBookBtn");
const addMemberBtn = document.getElementById("addMemberBtn");
const borrowBtn = document.getElementById("borrowBtn");
const returnBtn = document.getElementById("returnBtn");
const searchBtn = document.getElementById("searchBtn");

const bookList = document.getElementById("bookList");
const memberList = document.getElementById("memberList");
const transactionList = document.getElementById("transactionList");




addBookBtn.addEventListener("click", handleAddBook);
addMemberBtn.addEventListener("click", handleAddMember);




borrowBtn.addEventListener("click", handleBorrowBook);

returnBtn.addEventListener("click", handleReturnBook);
searchBtn.addEventListener("click", handleSearchBook);




function clearBookForm() {

    bookIdInput.value = "";
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookISBNInput.value = "";
    bookCategoryInput.value = "";
    bookCopiesInput.value = "";

}

function clearMemberForm() {

    memberIdInput.value = "";
    memberNameInput.value = "";
    memberEmailInput.value = "";
    memberPhoneInput.value = "";

}

function showMessage(message) {

    alert(message);

}

function createParagraph(text) {

    const p = document.createElement("p");
    p.textContent = text;
    return p;

}



function handleAddBook() {

    const id = Number(bookIdInput.value);

    const title = bookTitleInput.value.trim();

    const author = bookAuthorInput.value.trim();

    const isbn = bookISBNInput.value.trim();

    const category = bookCategoryInput.value.trim();

    const copies = Number(bookCopiesInput.value);


    const book = new Book(
        id,
        title,
        author,
        isbn,
        category,
        copies
    );

    const added = library.addBook(book);

    if (!added) {

        showMessage("Unable to add book.");
        return;

    }

    renderBooks();

    clearBookForm();

    showMessage("Book Added Successfully.");

}


function renderBooks(books = library.displayAllBooks()) {

    bookList.innerHTML = "";

    if (books.length === 0) {

        bookList.innerHTML = "<p>No Books Available</p>";

        return;
    }

    books.forEach(book => {

        const card = document.createElement("div");

        card.className = "item";

        const heading = document.createElement("h3");

        heading.textContent = book.title;

        card.appendChild(heading);

        card.appendChild(createParagraph(`ID : ${book.id}`));

        card.appendChild(createParagraph(`Author : ${book.author}`));

        card.appendChild(createParagraph(`ISBN : ${book.isbn}`));

        card.appendChild(createParagraph(`Category : ${book.category}`));

        card.appendChild(createParagraph(`Total Copies : ${book.totalCopies}`));

        card.appendChild(createParagraph(`Available : ${book.availableCopies}`));

        card.appendChild(createParagraph(`Borrowed : ${book.borrowCount}`));

        bookList.appendChild(card);

    });

}

function handleAddMember() {

    const id = Number(memberIdInput.value);

    const name = memberNameInput.value.trim();

    const email = memberEmailInput.value.trim();

    const phone = memberPhoneInput.value.trim();

    const member = new Member(

        id,
        name,
        email,
        phone

    );

    const added = library.addMember(member);

    if (!added) {

        showMessage("Unable to add member.");
        return;

    }

    renderMembers();

    clearMemberForm();

    showMessage("Member Added Successfully.");

}



function renderMembers(members = library.displayAllMembers()) {

    memberList.innerHTML = "";

    if (members.length === 0) {

        memberList.innerHTML = "<p>No Members Found</p>";

        return;

    }

    members.forEach(member => {

        const card = document.createElement("div");

        card.className = "item";

        const title = document.createElement("h3");

        title.textContent = member.name;

        card.appendChild(title);

        card.appendChild(createParagraph(`ID : ${member.id}`));

        card.appendChild(createParagraph(`Email : ${member.email}`));

        card.appendChild(createParagraph(`Phone : ${member.phone}`));

        card.appendChild(createParagraph(`Borrow Limit : ${member.maxBorrowLimit}`));

        card.appendChild(createParagraph(`Borrowed Books : ${member.borrowedCount}`));

        memberList.appendChild(card);

    });

}


function handleBorrowBook() {

    const memberId = Number(borrowMemberIdInput.value);

    const bookId = Number(borrowBookIdInput.value);

    const borrowed = library.borrowBook(memberId, bookId);

    if (!borrowed) {

        showMessage("Unable to borrow book.");

        return;

    }

    renderBooks();

    renderMembers();

    renderTransactions();

    borrowMemberIdInput.value = "";
    borrowBookIdInput.value = "";

    showMessage("Book Borrowed Successfully.");

}

// =======================================
// Return Book
// =======================================

function handleReturnBook() {

    const memberId = Number(returnMemberIdInput.value);

    const bookId = Number(returnBookIdInput.value);

    const returned = library.returnBook(memberId, bookId);

    if (!returned) {

        showMessage("Unable to return book.");

        return;

    }

    renderBooks();

    renderMembers();

    renderTransactions();

    returnMemberIdInput.value = "";
    returnBookIdInput.value = "";

    showMessage("Book Returned Successfully.");

}

// =======================================
// Render Transactions
// =======================================

function renderTransactions(
    transactions = library.displayAllTransactions()
) {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        transactionList.innerHTML = "<p>No Transactions Found</p>";

        return;

    }

    transactions.forEach(transaction => {

        const card = document.createElement("div");

        card.className = "item";

        const heading = document.createElement("h3");

        heading.textContent = `Transaction #${transaction.id}`;

        card.appendChild(heading);

        card.appendChild(
            createParagraph(`Member ID : ${transaction.memberId}`)
        );

        card.appendChild(
            createParagraph(`Book ID : ${transaction.bookId}`)
        );

        card.appendChild(
            createParagraph(
                `Borrow Date : ${new Date(transaction.borrowDate).toLocaleDateString()}`
            )
        );

        card.appendChild(
            createParagraph(
                `Due Date : ${new Date(transaction.dueDate).toLocaleDateString()}`
            )
        );

        card.appendChild(
            createParagraph(
                `Return Date : ${
                    transaction.returnDate
                        ? new Date(transaction.returnDate).toLocaleDateString()
                        : "-"
                }`
            )
        );

        card.appendChild(
            createParagraph(`Status : ${transaction.status}`)
        );

        transactionList.appendChild(card);

    });

}

// =======================================
// Search Books
// =======================================

function handleSearchBook() {

    const query = searchInput.value.trim();

    const type = searchType.value;

    if (query === "") {

        renderBooks();

        return;

    }

    let result = [];

    switch (type) {

        case "title":
            result = library.searchBooksByTitle(query);
            break;

        case "author":
            result = library.searchBooksByAuthor(query);
            break;

        case "category":
            result = library.searchBooksByCategory(query);
            break;

        default:
            result = [];

    }

    renderBooks(result);

}
searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        handleSearchBook();

    }

});
// =======================================
// Initial Render
// =======================================

renderBooks();

renderMembers();

renderTransactions();