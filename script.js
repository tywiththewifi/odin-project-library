
// Form Buttons
const addBookButton = document.querySelector(".btn-add");
const newBookPopUp = document.querySelector(".bookPopUp");
const submitButton = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");

// Form inputs
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readBookInput = document.getElementById("read");

// Containers
const container = document.querySelector(".container");
const bookCards = document.querySelector(".bookCards");

// const myLibrary = [];

addBookButton.addEventListener('click', () => {
    newBookPopUp.showModal();
} );

cancelButton.addEventListener("click", () => {
    clearForm();
    newBookPopUp.close();
    
});

function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readBookInput.checked = true;
}

class Book {

    static lastID = 0;
    static myLibrary = [];
    #bookID;

    constructor (title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
        this.#bookID = Book.lastID++;
    };

    get authorDisplay() {
        return `Author: ${this.author}`;
    }

    get pagesDisplay() {
        return `Pages: ${this.pages}`;
    }

    get bookID() {
        return this.#bookID;
    }
    
    static addBookToLibrary(book) {
        Book.myLibrary.push(book);
        console.log(`${book.title} added to library! ID: ${book.#bookID}`);
    }

    toggleStatus() {
        this.haveRead = !this.haveRead;
};

};

function displayBook(book) {
    const card = document.createElement('div');
    card.classList = 'card';
    card.setAttribute('data-book-id', book.bookID);

    const title = document.createElement('div');
    title.classList = 'title';
    title.textContent = `${book.title}`;

    const author = document.createElement('div');
    author.classList = 'author';
    author.textContent = book.authorDisplay;

    let pages = document.createElement('div');
    pages.classList = 'pages';
    pages.textContent = book.pagesDisplay;

    let read = document.createElement('button');
    read.textContent = `${book.haveRead ? "Read" : "Not Read"}`
    read.classList = `${book.haveRead ? "read" : "not-read"}`;
    read.style.width = '80px';
    read.style.height = '30px';
    read.addEventListener('click', () => {
        book.toggleStatus();
        read.textContent = `${book.haveRead ? "Read" : "Not Read"}`;
        read.classList = `${book.haveRead ? "read" : "not-read"}`;
    });

    let deleteButton = document.createElement('img');
    deleteButton.src = "images/trash-can-outline.svg";
    deleteButton.style.height = '20px';
    deleteButton.classList = 'remove';
    deleteButton.addEventListener('click', () => {
        let deleteIndex = Book.myLibrary.findIndex(b => b.bookID === book.bookID);
        if (deleteIndex !== -1) {
        Book.myLibrary.splice(deleteIndex, 1);
        bookCards.removeChild(card);
        }
    });
    card.appendChild(deleteButton);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    bookCards.appendChild(card);
}

function displayBooks() {
    for (book of Book.myLibrary) {
        displayBook(book);
    }
}

//Dummy Books to load with page

function loadDummyBooks() {
    const dummyBooks = [
        new Book("The Hunger Games", "Suzanne Collins", 384, true),
        new Book("Pride and Prejudice", "Jane Austen", 259, false)
    ]    

    dummyBooks.forEach(Book.addBookToLibrary);
}

loadDummyBooks();

displayBooks();

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newBook = new Book(titleInput.value, 
        authorInput.value, 
        parseInt(pagesInput.value), 
        readBookInput.checked);
    
    Book.addBookToLibrary(newBook);
    displayBook(newBook);
    newBookPopUp.close();
    clearForm();
})