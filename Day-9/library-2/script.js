/* =========================================================
   LIBRARY MANAGEMENT SYSTEM
   Core classes (Book, Member, Transaction, Library) + DOM wiring
   ========================================================= */

/* ---------------------------------------------------------
   BOOK
   --------------------------------------------------------- */
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

  /* ---- static validators (usable before an instance exists) ---- */
  static validateISBN(isbn) {
    if (typeof isbn !== "string") return false;
    if (isbn.trim() === "" || !/^\d{10}(\d{3})?$/.test(isbn)) return false;
    return true;
  }
  static validateAuthor(author) {
    if (typeof author !== "string") return false;
    if (author.trim() === "") return false;
    return true;
  }
  static validateTitle(title) {
    if (typeof title !== "string") return false;
    if (title.trim() === "" || title.length > 100 || title.length < 2) return false;
    return true;
  }
  static validateCategory(category) {
    if (typeof category !== "string") return false;
    if (category.trim() === "") return false;
    return true;
  }
  static validateTotalCopies(copies) {
    return Number.isInteger(copies) && copies > 0;
  }

  /* instance wrappers kept for backward compatibility */
  validateISBN(isbn) { return Book.validateISBN(isbn); }
  validateAuthor(author) { return Book.validateAuthor(author); }
  validateTitle(title) { return Book.validateTitle(title); }

  updateDetails(updateData) {
    const allowedFields = ["title", "author", "isbn", "category"];
    const validators = {
      isbn: Book.validateISBN,
      author: Book.validateAuthor,
      title: Book.validateTitle,
      category: Book.validateCategory,
    };

    // Pass 1: validate everything first so a bad field doesn't leave
    // earlier fields partially applied.
    for (const key in updateData) {
      if (!allowedFields.includes(key)) {
        console.warn(`Field "${key}" is not allowed to be updated.`);
        continue;
      }
      const validator = validators[key];
      if (validator && !validator(updateData[key])) {
        console.error(`Invalid ${key} format.`);
        return false;
      }
    }

    // Pass 2: apply.
    for (const key in updateData) {
      if (allowedFields.includes(key)) {
        this[key] = updateData[key];
      }
    }
    return true;
  }

  increaseCopies(copies) {
    if (copies <= 0 || !Number.isInteger(copies)) {
      console.error("Invalid number of copies. Please enter a positive integer.");
      return false;
    }
    this.totalCopies += copies;
    this.availableCopies += copies;
    return true;
  }

  decreaseCopies(copies) {
    if (copies <= 0 || !Number.isInteger(copies)) {
      console.error("Invalid number of copies. Please enter a positive integer.");
      return false;
    }
    if (copies > this.availableCopies) {
      console.error(`Cannot remove ${copies} copies. Only ${this.availableCopies} copies are available.`);
      return false;
    }
    this.totalCopies -= copies;
    this.availableCopies -= copies;
    return true;
  }

  displayInfo() {
    const { id, title, author, isbn, category, totalCopies, availableCopies, borrowCount } = this;
    return { id, title, author, isbn, category, totalCopies, availableCopies, borrowCount };
  }

  borrow() {
    if (this.availableCopies <= 0) return false;
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

/* ---------------------------------------------------------
   MEMBER
   --------------------------------------------------------- */
class Member {
  constructor(id, name, email, phone, borrowedBooks, maxBorrowLimit) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.borrowedBooks = borrowedBooks || [];
    this.maxBorrowLimit = maxBorrowLimit ?? 5;
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === "string" && emailRegex.test(email);
  }
  static validatePhone(phone) {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return typeof phone === "string" && phoneRegex.test(phone);
  }
  static validateName(name) {
    if (typeof name !== "string") return false;
    name = name.trim();
    if (name === "" || name.length < 2 || name.length > 50) return false;
    if (!/^[a-zA-Z\s]+$/.test(name)) return false;
    return true;
  }

  validateEmail(email) { return Member.validateEmail(email); }
  validatePhone(phone) { return Member.validatePhone(phone); }
  validateName(name) { return Member.validateName(name); }

  updateDetails(updateData) {
    const allowedFields = ["name", "email", "phone"];
    const validators = {
      email: Member.validateEmail,
      phone: Member.validatePhone,
      name: Member.validateName,
    };

    for (const key in updateData) {
      if (!allowedFields.includes(key)) {
        console.warn(`Field "${key}" is not allowed to be updated.`);
        continue;
      }
      const validator = validators[key];
      if (validator && !validator(updateData[key])) {
        console.error(`Invalid ${key} format.`);
        return false;
      }
    }

    for (const key in updateData) {
      if (allowedFields.includes(key)) {
        this[key] = updateData[key];
      }
    }
    return true;
  }

  displayInfo() {
    const { id, name, email, phone, maxBorrowLimit } = this;
    return { id, name, email, phone, maxBorrowLimit, borrowedCount: this.borrowedBooks.length };
  }

  canBorrow(bookId) {
    if (this.borrowedBooks.length >= this.maxBorrowLimit) return false;
    if (this.borrowedBooks.includes(bookId)) return false;
    return true;
  }

  removeBorrowedBook(bookId) {
    const index = this.borrowedBooks.indexOf(bookId);
    if (index === -1) return false;
    this.borrowedBooks.splice(index, 1);
    return true;
  }

  borrowBook(bookId) {
    this.borrowedBooks.push(bookId);
    return true;
  }
}

/* ---------------------------------------------------------
   TRANSACTION
   --------------------------------------------------------- */
class Transaction {
  constructor(id, memberId, bookId, borrowDate, dueDate) {
    this.id = id;
    this.memberId = memberId;
    this.bookId = bookId;
    this.borrowDate = borrowDate;
    this.dueDate = dueDate;
    this.returnDate = null;
    this.status = "BORROWED";
  }

  markAsReturned() {
    if (this.status === "RETURNED") {
      console.error("Book is already returned.");
      return false;
    }
    this.status = "RETURNED";
    this.returnDate = new Date();
    return true;
  }

  isOverdue() {
    if (this.status === "RETURNED") return false;
    return new Date() > this.dueDate;
  }

  displayInfo() {
    const { id, memberId, bookId, borrowDate, dueDate, returnDate, status } = this;
    return { id, memberId, bookId, borrowDate, dueDate, returnDate, status, overdue: this.isOverdue() };
  }
}

/* ---------------------------------------------------------
   LIBRARY  (auto-incrementing IDs live here)
   --------------------------------------------------------- */
class Library {
  constructor() {
    this.books = [];
    this.members = [];
    this.transactions = [];

    this.bookById = new Map();
    this.bookByISBN = new Map();
    this.memberById = new Map();
    this.memberByEmail = new Map();
    this.transactionById = new Map();

    // auto-increment counters -> no more manual IDs anywhere
    this.nextBookId = 1;
    this.nextMemberId = 1;
    this.nextTransactionId = 1;
  }

  /* ---------------- BOOK CRUD ---------------- */

  /** Creates & adds a book from plain data. ID is generated automatically. */
  createBook({ title, author, isbn, category, totalCopies }) {
    if (!Book.validateTitle(title)) { console.error("Invalid title format."); return null; }
    if (!Book.validateAuthor(author)) { console.error("Invalid author name format."); return null; }
    if (!Book.validateISBN(isbn)) { console.error("Invalid ISBN format."); return null; }
    if (!Book.validateCategory(category)) { console.error("Invalid category format."); return null; }
    if (!Book.validateTotalCopies(totalCopies)) { console.error("Invalid number of copies."); return null; }
    if (this.bookByISBN.has(isbn)) { console.error("Book with this ISBN already exists."); return null; }

    const book = new Book(this.nextBookId, title.trim(), author.trim(), isbn.trim(), category.trim(), totalCopies);
    this.books.push(book);
    this.bookById.set(book.id, book);
    this.bookByISBN.set(book.isbn, book);
    this.nextBookId++;
    return book;
  }

  // Kept for API compatibility with pre-built Book instances.
  addBook(newBook) {
    if (!(newBook instanceof Book)) { console.error("Invalid book object."); return false; }
    if (this.bookById.has(newBook.id)) { console.error("Book with this ID already exists."); return false; }
    if (this.bookByISBN.has(newBook.isbn)) { console.error("Book with this ISBN already exists."); return false; }
    this.books.push(newBook);
    this.bookById.set(newBook.id, newBook);
    this.bookByISBN.set(newBook.isbn, newBook);
    if (newBook.id >= this.nextBookId) this.nextBookId = newBook.id + 1;
    return true;
  }

  removeBook(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) { console.error("Book not found."); return false; }
    const book = this.books[index];
    if (book.availableCopies !== book.totalCopies) {
      console.error("Cannot remove book. Some copies are currently borrowed.");
      return false;
    }
    this.books.splice(index, 1);
    this.bookById.delete(book.id);
    this.bookByISBN.delete(book.isbn);
    return true;
  }

  getBookById(id) {
    if (!Number.isInteger(id) || id <= 0) { console.error("Invalid book ID. Please enter a positive integer."); return null; }
    const book = this.bookById.get(id);
    if (!book) { console.error("Book not found."); return null; }
    return book;
  }

  getBookByISBN(isbn) {
    if (!Book.validateISBN(isbn)) { console.error("Invalid ISBN format."); return null; }
    const book = this.bookByISBN.get(isbn);
    if (!book) { console.error("Book not found."); return null; }
    return book;
  }

  searchBooksByTitle(title) {
    if (typeof title !== "string") return [];
    const query = title.trim().toLowerCase();
    if (query === "") return [];
    return this.books.filter((book) => book.title.trim().toLowerCase().includes(query));
  }

  searchBooksByAuthor(author) {
    if (typeof author !== "string") return [];
    const query = author.trim().toLowerCase();
    if (query === "") return [];
    return this.books.filter((book) => book.author.trim().toLowerCase().includes(query));
  }

  searchBooksByCategory(category) {
    if (typeof category !== "string") return [];
    const query = category.trim().toLowerCase();
    if (query === "") return [];
    return this.books.filter((book) => book.category.trim().toLowerCase().includes(query));
  }

  updateBook(id, updateData) {
    if (typeof updateData !== "object" || updateData === null) { console.error("Invalid update data."); return false; }
    if (!Number.isInteger(id) || id <= 0) { console.error("Invalid book ID."); return false; }
    const book = this.bookById.get(id);
    if (!book) { console.error("Book Not Found"); return false; }

    if (updateData.isbn) {
      const existingBook = this.bookByISBN.get(updateData.isbn);
      if (existingBook && existingBook.id !== id) { console.error("ISBN already exists."); return false; }
    }

    const oldISBN = book.isbn;
    const updated = book.updateDetails(updateData);
    if (!updated) return false;

    if (oldISBN !== book.isbn) {
      this.bookByISBN.delete(oldISBN);
      this.bookByISBN.set(book.isbn, book);
    }
    return true;
  }

  displayAllBooks() {
    return this.books.map((book) => book.displayInfo());
  }

  /* ---------------- MEMBER CRUD ---------------- */

  /** Creates & adds a member from plain data. ID is generated automatically. */
  createMember({ name, email, phone, maxBorrowLimit }) {
    if (!Member.validateName(name)) { console.error("Invalid name format."); return null; }
    if (!Member.validateEmail(email)) { console.error("Invalid email format."); return null; }
    if (!Member.validatePhone(phone)) { console.error("Invalid phone number format."); return null; }
    if (this.memberByEmail.has(email)) { console.error("Member with this email already exists."); return null; }

    const limit = maxBorrowLimit && Number.isInteger(maxBorrowLimit) && maxBorrowLimit > 0 ? maxBorrowLimit : 5;
    const member = new Member(this.nextMemberId, name.trim(), email.trim(), phone.trim(), [], limit);
    this.members.push(member);
    this.memberById.set(member.id, member);
    this.memberByEmail.set(member.email, member);
    this.nextMemberId++;
    return member;
  }

  addMember(member) {
    if (!(member instanceof Member)) { console.error("Invalid member object."); return false; }
    if (this.memberById.has(member.id)) { console.error("Member with this ID already exists."); return false; }
    if (this.memberByEmail.has(member.email)) { console.error("Member with this email already exists."); return false; }
    this.members.push(member);
    this.memberById.set(member.id, member);
    this.memberByEmail.set(member.email, member);
    if (member.id >= this.nextMemberId) this.nextMemberId = member.id + 1;
    console.log("Member added successfully.");
    return true;
  }

  updateMember(id, updateData) {
    if (typeof updateData !== "object" || updateData === null) { console.error("Invalid update data."); return false; }
    if (!Number.isInteger(id) || id <= 0) { console.error("Invalid Member ID."); return false; }
    const member = this.memberById.get(id);
    if (!member) { console.error("Member not found."); return false; }

    if (updateData.email) {
      const existingMember = this.memberByEmail.get(updateData.email);
      if (existingMember && existingMember.id !== id) { console.error("Email already exists."); return false; }
    }

    const oldEmail = member.email;
    const updated = member.updateDetails(updateData);
    if (!updated) return false;

    if (oldEmail !== member.email) {
      this.memberByEmail.delete(oldEmail);
      this.memberByEmail.set(member.email, member);
    }
    console.log("Member updated successfully.");
    return true;
  }

  removeMember(id) {
    if (!Number.isInteger(id) || id <= 0) { console.error("Invalid Member ID."); return false; }
    const member = this.memberById.get(id);
    if (!member) { console.error("Member not found."); return false; }
    if (member.borrowedBooks.length > 0) { console.error("Cannot remove member. Books are still borrowed."); return false; }

    const index = this.members.findIndex((m) => m.id === id);
    this.members.splice(index, 1);
    this.memberById.delete(id);
    this.memberByEmail.delete(member.email);
    console.log("Member removed successfully.");
    return true;
  }

  getMemberById(id) {
    if (!Number.isInteger(id) || id <= 0) { console.error("Invalid Member ID."); return null; }
    const member = this.memberById.get(id);
    if (!member) { console.error("Member not found."); return null; }
    return member;
  }

  displayAllMembers() {
    return this.members.map((member) => member.displayInfo());
  }

  /* ---------------- BORROW / RETURN ---------------- */

  borrowBook(memberId, bookId) {
    const member = this.memberById.get(memberId);
    if (!member) { console.error("Member not found."); return false; }

    const book = this.bookById.get(bookId);
    if (!book) { console.error("Book not found."); return false; }

    if (book.availableCopies <= 0) { console.error("No available copies."); return false; }
    if (!member.canBorrow(bookId)) { console.error("Member cannot borrow this book."); return false; }
    if (!book.borrow()) return false;

    member.borrowBook(bookId);

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    const transaction = new Transaction(this.nextTransactionId, memberId, bookId, borrowDate, dueDate);
    this.transactions.push(transaction);
    this.transactionById.set(transaction.id, transaction);
    this.nextTransactionId++;

    console.log("Book borrowed successfully.");
    return true;
  }

  returnBook(memberId, bookId) {
    const member = this.memberById.get(memberId);
    if (!member) { console.error("Member not found."); return false; }

    const book = this.bookById.get(bookId);
    if (!book) { console.error("Book not found."); return false; }

    if (!member.borrowedBooks.includes(bookId)) { console.error("This member didn't borrow this book."); return false; }

    const transaction = this.transactions.find(
      (t) => t.memberId === memberId && t.bookId === bookId && t.status === "BORROWED"
    );
    if (!transaction) { console.error("Active transaction not found."); return false; }

    transaction.markAsReturned();
    if (!book.returnBook()) return false;

    member.removeBorrowedBook(bookId);
    console.log("Book returned successfully.");
    return true;
  }

  /* ---------------- TRANSACTIONS ---------------- */

  displayAllTransactions() {
    return this.transactions.map((t) => t.displayInfo());
  }

  getTransactionById(id) {
    const transaction = this.transactionById.get(id);
    if (!transaction) { console.error("Transaction not found."); return null; }
    return transaction;
  }
}

/* =========================================================
   DOM WIRING
   ========================================================= */
const library = new Library();

// Seed with a little sample data so the UI isn't empty on first load.
(function seed() {
  const b1 = library.createBook({ title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780618968633", category: "Fantasy", totalCopies: 3 });
  const b2 = library.createBook({ title: "Dune", author: "Frank Herbert", isbn: "9780441013593", category: "Sci-Fi", totalCopies: 2 });
  library.createBook({ title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", category: "Technology", totalCopies: 1 });

  const m1 = library.createMember({ name: "Asha Patel", email: "asha@example.com", phone: "9876543210", maxBorrowLimit: 3 });
  library.createMember({ name: "Rohan Mehta", email: "rohan@example.com", phone: "9123456780" });

  if (b1 && m1) library.borrowBook(m1.id, b1.id);
})();

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Tab navigation ---------- */
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.target).classList.add("active");
    });
  });

  /* ---------- Toast helper ---------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function toast(message, type = "success") {
    toastEl.textContent = message;
    toastEl.className = `toast show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  /* =====================================================
     BOOKS
     ===================================================== */
  const bookForm = document.getElementById("book-form");
  const bookFormTitle = document.getElementById("book-form-title");
  const bookEditIdField = document.getElementById("book-edit-id");
  const bookTitleInput = document.getElementById("book-title");
  const bookAuthorInput = document.getElementById("book-author");
  const bookIsbnInput = document.getElementById("book-isbn");
  const bookCategoryInput = document.getElementById("book-category");
  const bookCopiesInput = document.getElementById("book-copies");
  const bookCancelEditBtn = document.getElementById("book-cancel-edit");
  const bookTableBody = document.getElementById("book-table-body");
  const bookSearchInput = document.getElementById("book-search");
  const bookSearchField = document.getElementById("book-search-field");

  function resetBookForm() {
    bookForm.reset();
    bookEditIdField.value = "";
    bookFormTitle.textContent = "Add a Book";
    bookCancelEditBtn.hidden = true;
    bookCopiesInput.disabled = false;
  }

  function renderBooks(list = library.displayAllBooks()) {
    bookTableBody.innerHTML = "";

    if (list.length === 0) {
      bookTableBody.innerHTML = `<tr class="empty-row"><td colspan="7">No books to show.</td></tr>`;
      return;
    }

    for (const b of list) {
      const tr = document.createElement("tr");
      const statusClass = b.availableCopies === 0 ? "badge-danger" : "badge-ok";
      tr.innerHTML = `
        <td class="mono">#${b.id}</td>
        <td>${escapeHtml(b.title)}</td>
        <td>${escapeHtml(b.author)}</td>
        <td class="mono">${escapeHtml(b.isbn)}</td>
        <td>${escapeHtml(b.category)}</td>
        <td><span class="badge ${statusClass}">${b.availableCopies} / ${b.totalCopies}</span></td>
        <td class="actions">
          <button class="icon-btn" data-action="edit-book" data-id="${b.id}" title="Edit">Edit</button>
          <button class="icon-btn danger" data-action="delete-book" data-id="${b.id}" title="Remove">Remove</button>
          <button class="icon-btn" data-action="add-copy" data-id="${b.id}" title="Add copy">+1</button>
        </td>`;
      bookTableBody.appendChild(tr);
    }
  }

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = bookEditIdField.value ? Number(bookEditIdField.value) : null;

    if (editId) {
      const ok = library.updateBook(editId, {
        title: bookTitleInput.value.trim(),
        author: bookAuthorInput.value.trim(),
        isbn: bookIsbnInput.value.trim(),
        category: bookCategoryInput.value.trim(),
      });
      if (!ok) { toast("Could not update book. Check the fields.", "error"); return; }
      toast("Book updated.");
    } else {
      const totalCopies = Number(bookCopiesInput.value);
      const book = library.createBook({
        title: bookTitleInput.value.trim(),
        author: bookAuthorInput.value.trim(),
        isbn: bookIsbnInput.value.trim(),
        category: bookCategoryInput.value.trim(),
        totalCopies,
      });
      if (!book) { toast("Could not add book. Check the fields.", "error"); return; }
      toast(`Book added with ID #${book.id}.`);
    }

    resetBookForm();
    renderBooks();
    populateBorrowBookSelect();
  });

  bookCancelEditBtn.addEventListener("click", resetBookForm);

  bookTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === "edit-book") {
      const book = library.getBookById(id);
      if (!book) return;
      bookFormTitle.textContent = `Edit Book #${book.id}`;
      bookEditIdField.value = book.id;
      bookTitleInput.value = book.title;
      bookAuthorInput.value = book.author;
      bookIsbnInput.value = book.isbn;
      bookCategoryInput.value = book.category;
      bookCopiesInput.value = book.totalCopies;
      bookCopiesInput.disabled = true; // copies changed via +1 / remove, not raw edit
      bookCancelEditBtn.hidden = false;
      document.getElementById("books-panel-top").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (action === "delete-book") {
      if (!confirm("Remove this book from the catalog?")) return;
      const ok = library.removeBook(id);
      if (!ok) { toast("Cannot remove: copies are currently borrowed.", "error"); return; }
      toast("Book removed.");
      renderBooks();
      populateBorrowBookSelect();
    }

    if (action === "add-copy") {
      const book = library.getBookById(id);
      if (book && book.increaseCopies(1)) {
        toast(`Added a copy of "${book.title}".`);
        renderBooks();
        populateBorrowBookSelect();
      }
    }
  });

  function applyBookSearch() {
    const q = bookSearchInput.value.trim();
    const field = bookSearchField.value;
    if (q === "") { renderBooks(); return; }

    let results = [];
    if (field === "title") results = library.searchBooksByTitle(q);
    else if (field === "author") results = library.searchBooksByAuthor(q);
    else results = library.searchBooksByCategory(q);

    renderBooks(results.map((b) => b.displayInfo()));
  }
  bookSearchInput.addEventListener("input", applyBookSearch);
  bookSearchField.addEventListener("change", applyBookSearch);

  /* =====================================================
     MEMBERS
     ===================================================== */
  const memberForm = document.getElementById("member-form");
  const memberFormTitle = document.getElementById("member-form-title");
  const memberEditIdField = document.getElementById("member-edit-id");
  const memberNameInput = document.getElementById("member-name");
  const memberEmailInput = document.getElementById("member-email");
  const memberPhoneInput = document.getElementById("member-phone");
  const memberLimitInput = document.getElementById("member-limit");
  const memberCancelEditBtn = document.getElementById("member-cancel-edit");
  const memberTableBody = document.getElementById("member-table-body");
  const memberSearchInput = document.getElementById("member-search");

  function resetMemberForm() {
    memberForm.reset();
    memberEditIdField.value = "";
    memberFormTitle.textContent = "Add a Member";
    memberCancelEditBtn.hidden = true;
    memberLimitInput.value = 5;
  }

  function renderMembers(list = library.displayAllMembers()) {
    memberTableBody.innerHTML = "";

    if (list.length === 0) {
      memberTableBody.innerHTML = `<tr class="empty-row"><td colspan="6">No members to show.</td></tr>`;
      return;
    }

    for (const m of list) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="mono">#${m.id}</td>
        <td>${escapeHtml(m.name)}</td>
        <td>${escapeHtml(m.email)}</td>
        <td>${escapeHtml(m.phone)}</td>
        <td><span class="badge badge-ok">${m.borrowedCount} / ${m.maxBorrowLimit}</span></td>
        <td class="actions">
          <button class="icon-btn" data-action="edit-member" data-id="${m.id}">Edit</button>
          <button class="icon-btn danger" data-action="delete-member" data-id="${m.id}">Remove</button>
        </td>`;
      memberTableBody.appendChild(tr);
    }
  }

  memberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = memberEditIdField.value ? Number(memberEditIdField.value) : null;

    if (editId) {
      const ok = library.updateMember(editId, {
        name: memberNameInput.value.trim(),
        email: memberEmailInput.value.trim(),
        phone: memberPhoneInput.value.trim(),
      });
      if (!ok) { toast("Could not update member. Check the fields.", "error"); return; }
      toast("Member updated.");
    } else {
      const member = library.createMember({
        name: memberNameInput.value.trim(),
        email: memberEmailInput.value.trim(),
        phone: memberPhoneInput.value.trim(),
        maxBorrowLimit: Number(memberLimitInput.value) || 5,
      });
      if (!member) { toast("Could not add member. Check the fields.", "error"); return; }
      toast(`Member added with ID #${member.id}.`);
    }

    resetMemberForm();
    renderMembers();
    populateBorrowMemberSelect();
  });

  memberCancelEditBtn.addEventListener("click", resetMemberForm);

  memberTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === "edit-member") {
      const member = library.getMemberById(id);
      if (!member) return;
      memberFormTitle.textContent = `Edit Member #${member.id}`;
      memberEditIdField.value = member.id;
      memberNameInput.value = member.name;
      memberEmailInput.value = member.email;
      memberPhoneInput.value = member.phone;
      memberLimitInput.value = member.maxBorrowLimit;
      memberLimitInput.disabled = true; // limit not part of updateDetails allowed fields
      memberCancelEditBtn.hidden = false;
      document.getElementById("members-panel-top").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (action === "delete-member") {
      if (!confirm("Remove this member?")) return;
      const ok = library.removeMember(id);
      if (!ok) { toast("Cannot remove: member still has borrowed books.", "error"); return; }
      toast("Member removed.");
      renderMembers();
      populateBorrowMemberSelect();
    }
  });

  memberSearchInput.addEventListener("input", () => {
    const q = memberSearchInput.value.trim().toLowerCase();
    if (q === "") { renderMembers(); return; }
    const results = library.displayAllMembers().filter(
      (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    );
    renderMembers(results);
  });

  /* =====================================================
     BORROW / RETURN
     ===================================================== */
  const borrowMemberSelect = document.getElementById("borrow-member-select");
  const borrowBookSelect = document.getElementById("borrow-book-select");
  const borrowBtn = document.getElementById("borrow-btn");
  const transactionTableBody = document.getElementById("transaction-table-body");
  const transactionFilter = document.getElementById("transaction-filter");

  function populateBorrowMemberSelect() {
    const current = borrowMemberSelect.value;
    borrowMemberSelect.innerHTML = library.members
      .map((m) => `<option value="${m.id}">#${m.id} - ${escapeHtml(m.name)}</option>`)
      .join("");
    if (current) borrowMemberSelect.value = current;
  }

  function populateBorrowBookSelect() {
    const current = borrowBookSelect.value;
    borrowBookSelect.innerHTML = library.books
      .map(
        (b) =>
          `<option value="${b.id}" ${b.availableCopies === 0 ? "disabled" : ""}>#${b.id} - ${escapeHtml(b.title)} (${b.availableCopies} left)</option>`
      )
      .join("");
    if (current) borrowBookSelect.value = current;
  }

  function renderTransactions(filter = "all") {
    let list = library.displayAllTransactions();
    if (filter === "borrowed") list = list.filter((t) => t.status === "BORROWED");
    if (filter === "returned") list = list.filter((t) => t.status === "RETURNED");
    if (filter === "overdue") list = list.filter((t) => t.overdue);

    transactionTableBody.innerHTML = "";

    if (list.length === 0) {
      transactionTableBody.innerHTML = `<tr class="empty-row"><td colspan="8">No transactions to show.</td></tr>`;
      return;
    }

    for (const t of list) {
      const book = library.bookById.get(t.bookId);
      const member = library.memberById.get(t.memberId);
      const statusBadge =
        t.status === "RETURNED"
          ? `<span class="badge badge-neutral">Returned</span>`
          : t.overdue
          ? `<span class="badge badge-danger">Overdue</span>`
          : `<span class="badge badge-ok">Borrowed</span>`;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="mono">#${t.id}</td>
        <td>${member ? escapeHtml(member.name) : "—"}</td>
        <td>${book ? escapeHtml(book.title) : "—"}</td>
        <td>${formatDate(t.borrowDate)}</td>
        <td>${formatDate(t.dueDate)}</td>
        <td>${t.returnDate ? formatDate(t.returnDate) : "—"}</td>
        <td>${statusBadge}</td>
        <td class="actions">
          ${
            t.status === "BORROWED"
              ? `<button class="icon-btn" data-action="return-book" data-member="${t.memberId}" data-book="${t.bookId}">Return</button>`
              : ""
          }
        </td>`;
      transactionTableBody.appendChild(tr);
    }
  }

  borrowBtn.addEventListener("click", () => {
    const memberId = Number(borrowMemberSelect.value);
    const bookId = Number(borrowBookSelect.value);
    if (!memberId || !bookId) { toast("Select both a member and a book.", "error"); return; }

    const ok = library.borrowBook(memberId, bookId);
    if (!ok) { toast("Could not complete the borrow. Check limits and availability.", "error"); return; }

    toast("Book borrowed successfully.");
    renderBooks();
    renderMembers();
    renderTransactions(transactionFilter.value);
    populateBorrowBookSelect();
  });

  transactionTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action='return-book']");
    if (!btn) return;
    const memberId = Number(btn.dataset.member);
    const bookId = Number(btn.dataset.book);
    const ok = library.returnBook(memberId, bookId);
    if (!ok) { toast("Could not process the return.", "error"); return; }

    toast("Book returned successfully.");
    renderBooks();
    renderMembers();
    renderTransactions(transactionFilter.value);
    populateBorrowBookSelect();
  });

  transactionFilter.addEventListener("change", () => renderTransactions(transactionFilter.value));

  /* =====================================================
     HELPERS
     ===================================================== */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(date) {
    if (!date) return "—";
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  /* ---------- Initial render ---------- */
  renderBooks();
  renderMembers();
  populateBorrowMemberSelect();
  populateBorrowBookSelect();
  renderTransactions();
});