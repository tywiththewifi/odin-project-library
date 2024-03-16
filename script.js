const addBookButton = document.querySelector(".btn-add");
const newBookPopUp = document.querySelector(".bookPopUp");
const submitButton = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readBookInput = document.getElementById("read");


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
        this.pages = number;
        this.haveRead = function() {
            if (true) {
                return "have read";
            } else {
                return "not read yet";
            }
        };
        this.info = function() {
            console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.haveRead)
        };
        this.bookID = this.assignID();
    };
    
    assignID() {
        return myLibrary.length;
    };

};

function addBooktoLibrary(newBook) {
    newBook.assignID();
    myLibrary.push(newBook);
    console.log(`${newBook.title} added to library! ID: ${newBook.bookID}`)
    return `${newBook.title} added to the library! ID: ${newBook.bookID}`;
}


