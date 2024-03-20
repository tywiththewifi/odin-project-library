const addBookButton = document.querySelector(".btn-add");
const newBookPopUp = document.querySelector(".bookPopUp");
const submitButton = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readBookInput = document.getElementById("read");

const container = document.querySelector(".container");
const bookCards = document.querySelector(".bookCards");

const myLibrary = [];

addBookButton.addEventListener('click', () => {
    newBookPopUp.showModal();
} );

cancelButton.addEventListener("click", () => {
    clearForm();
    newBookPopUp.close();
    
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newBook = new Book(titleInput.value, 
        authorInput.value, 
        parseInt(pagesInput.value), 
        readBookInput.checked);
    
    addBooktoLibrary(newBook);
    displayBook(newBook);
    newBookPopUp.close();
    clearForm();
})

function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readBookInput.checked = true;
}

class Book {
    constructor (title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
        this.info = function() {
            console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.haveRead)
        };
        this.bookID = this.assignID();
    };
    
    assignID() {
        return myLibrary.length;
    };

    toggleStatus() {
        this.read = this.read ? false : true;
};

};


function addBooktoLibrary(newBook) {
    newBook.assignID();
    myLibrary.push(newBook);
    console.log(`${newBook.title} added to library! ID: ${newBook.bookID}`)
    return `${newBook.title} added to the library! ID: ${newBook.bookID}`;
}

function displayBook(book) {
    let card = document.createElement('div');
    card.classList = 'card';
    card.setAttribute('data-book-id', book.bookID);
    let title = document.createElement('div');
    title.textContent = `${book.title}`;
    let author = document.createElement('div');
    author.textContent = `${book.author}`;
    let pages = document.createElement('div');
    pages.textContent = `${book.pages} ${book.pages === 1 ? " page" : " pages"}`;
    let read = document.createElement('button');
    read.textContent = `${book.read ? "Read" : "Not Read"}`
    read.classList = `${book.read ? "read" : "not read"} grow`;
    read.style.width = '80px';
    read.style.height = '30px';
    read.addEventListener('click', () => {
        book.toggleStatus();
        read.textContent = `${book.read ? "Read" : "Not Read"}`;
        read.classList = `${book.read ? "read" : "not read"}`;
    });

    let deleteButton = document.createElement('img');
    deleteButton.src = "images/trash-can-outline.svg";
    deleteButton.style.height = '20px';
    deleteButton.classList = 'remove grow';
    deleteButton.addEventListener('click', () => {
        let deleteIndex = myLibrary.findIndex(b => b.bookID === book.bookID);
        if (deleteIndex !== -1) {
        myLibrary.splice(deleteIndex, 1);
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
    for (book of myLibrary);
        displayBook(book);
}

displayBooks();

