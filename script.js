const library = []

function Book(title, author) {
  this.title = title;
  this.author = author;
}


function addBookToLibrary(book) {
  library.push(book);
}

function deleteBook(e) {
  console.log(e.currentTarget.dataset.index)
  library.splice(e.currentTarget.dataset.index, 1);
  listBooks();
}

function listBooks() {
  let tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    let newRow = tBody.insertRow();
    let newTitle = newRow.insertCell();
    let newAuthor = newRow.insertCell();
    let newDeleteCell = newRow.insertCell();

    let newDeleteButton = document.createElement("button");
    newDeleteButton.innerText = "Delete";
    newDeleteButton.dataset.index = i;
    newDeleteButton.addEventListener("click", deleteBook);
    newDeleteCell.appendChild(newDeleteButton);

    newTitle.innerText = book.title;
    newAuthor.innerText = book.author;
  }
}

document.querySelector("#addButton").addEventListener("click", () => {
  newTitle = document.getElementById("title").value;
  newAuthor = document.getElementById("author").value;

  if (newTitle != "" && newAuthor != "") {
    newBook = new Book(newTitle, newAuthor);
    addBookToLibrary(newBook);
    listBooks();
  }
})

// Dummy entries
b1 = new Book("Dummy Book 1", "Dummy Author 1");
b2 = new Book("Dummy Book 2", "Dummy Author 2");
addBookToLibrary(b1);
addBookToLibrary(b2);
listBooks();