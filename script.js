class Book {
  constructor(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pages = pageCount;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
    listBooks();
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pageCount, read) {
    this.books.push(new Book(title, author, pageCount, read));
  }
}

function listBooks() {
  let tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
  for (let i = 0; i < library.books.length; i++) {
    const book = library.books[i];
    let newRow = tBody.insertRow();
    let newTitle = newRow.insertCell();
    let newAuthor = newRow.insertCell();
    let newPages = newRow.insertCell();
    let newRead = newRow.insertCell();
    let newDeleteCell = newRow.insertCell();

    let newDeleteButton = document.createElement("button");
    newDeleteButton.innerText = "Delete";
    newDeleteButton.dataset.index = i;
    newDeleteButton.addEventListener("click", (e) => {
      library.splice(e.currentTarget.dataset.index, 1);
      listBooks();
    });
    newDeleteCell.appendChild(newDeleteButton);

    newRead.addEventListener("click", () => {
      book.toggleRead();
    })

    newTitle.innerText = book.title;
    newAuthor.innerText = book.author;
    newPages.innerText = book.pages;
    newRead.innerText = book.read;
  }
}

const library = new Library;

// Dummy entries
library.addBook("Dummy Book 1", "Dummy Author 1", 100, true);
library.addBook("Dummy Book 2", "Dummy Author 2", 200, false);
listBooks();

// Form dialog

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addButton");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");

showButton.addEventListener("click", () => {
  dialog.showModal();
})

submitButton.addEventListener("click", () => {
  dialog.close();
  newTitle = document.getElementById("title").value;
  newAuthor = document.getElementById("author").value;
  newPages = document.getElementById("pages").value;
  newRead = document.getElementById("read").checked;

  if (newTitle != "" && newAuthor != "") {
    if (newPages == "") {
      newPages = 0;
    }
    library.addBook(newTitle, newAuthor, newPages, newRead);
    listBooks();
  }
})

cancelButton.addEventListener("click", () => {
  dialog.close();
})