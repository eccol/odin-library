const library = []

function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pages = pageCount;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
}

function listBooks() {
  let tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    const book = library[i];
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
      toggleRead(book);
    })

    newTitle.innerText = book.title;
    newAuthor.innerText = book.author;
    newPages.innerText = book.pages;
    newRead.innerText = book.read;
  }
}

function toggleRead(book) {
  book.read = !book.read;
  listBooks();
}

// Dummy entries
b1 = new Book("Dummy Book 1", "Dummy Author 1", 100, true);
b2 = new Book("Dummy Book 2", "Dummy Author 2", 200, false);
addBookToLibrary(b1);
addBookToLibrary(b2);
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
    newBook = new Book(newTitle, newAuthor, newPages, newRead);
    addBookToLibrary(newBook);
    listBooks();
  }
})

cancelButton.addEventListener("click", () => {
  dialog.close();
})