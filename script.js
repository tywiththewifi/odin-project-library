
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

const myLibrary = [];

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
    constructor (title, author, pages, haveRead) {
        this.title = title;
        this.author = "Author: " + author;
        this.pages = "Pages: " + pages;
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
        this.haveRead = this.haveRead ? false : true;
};

};


function addBookToLibrary(newBook) {
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
    title.classList = 'title';
    title.textContent = `${book.title}`;
    let author = document.createElement('div');
    author.classList = 'author';
    author.textContent = `${book.author}`;
    let pages = document.createElement('div');
    pages.classList = 'pages';
    pages.textContent = `${book.pages}`;
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
    for (book of myLibrary) {
        displayBook(book);
    }
}

//Dummy Books to load with page
theHungerGames = new Book("The Hunger Games", "Suzanne Collins", 384, true);
prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen", 259, false);
addBookToLibrary(theHungerGames);
addBookToLibrary(prideAndPrejudice);

displayBooks();

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newBook = new Book(titleInput.value, 
        authorInput.value, 
        parseInt(pagesInput.value), 
        readBookInput.checked);
    
    addBookToLibrary(newBook);
    displayBook(newBook);
    newBookPopUp.close();
    clearForm();
})