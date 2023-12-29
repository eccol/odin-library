class Book {
  constructor(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pages = pageCount;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pageCount, read) {
    this.books.push(new Book(title, author, pageCount, read));
  }

  deleteBook(i) {
    this.books.splice(i, 1);
  }

  get bookCount() {
    return this.books.length;
  }
}

function updateDisplay() {
  document.querySelector(".output-container").innerHTML = "";
  if (document.getElementById("table-switch").checked) {
    updateDisplayTable();
  } else {
    updateDisplayBoxes();
  }
}

function updateDisplayBoxes() {
  container = document.querySelector(".output-container");
  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  for (let i = 0; i < library.bookCount; i++) {
    const book = library.books[i];
    const card = document.querySelector(".card-template").content.cloneNode(true).querySelector(".card");
    card.querySelector(".title").innerText = book.title;
    card.querySelector(".author").innerText = book.author;
    card.querySelector(".pages").innerText = book.pages + " pages";
    if (book.read) {
      card.querySelector(".read").innerText = "read";
    } else {
      card.querySelector(".read").innerText = "unread";
    }

    let newDeleteButton = document.createElement("button");
    newDeleteButton.innerText = "Delete";
    newDeleteButton.dataset.index = i;
    newDeleteButton.addEventListener("click", (e) => {
      library.deleteBook(e.currentTarget.dataset.index);
      updateDisplay();
    });
    card.appendChild(newDeleteButton);

    cardContainer.appendChild(card);
  }
  container.appendChild(cardContainer);
}

function updateDisplayTable() {
  document.querySelector(".output-container").innerHTML = `<table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>`
  let tBody = document.querySelector("tbody");
  for (let i = 0; i < library.bookCount; i++) {
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
      library.deleteBook(e.currentTarget.dataset.index);
      updateDisplay();
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
updateDisplay();

// Form dialog

const formController = (() => {
  const dialog = document.querySelector("dialog");
  const showButton = document.getElementById("addButton");
  const submitButton = document.getElementById("submitButton");
  const cancelButton = document.getElementById("cancelButton");
  const tableToggle = document.getElementById("table-switch");

  tableToggle.addEventListener("change", updateDisplay);

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
      updateDisplay();
    }
  })

  cancelButton.addEventListener("click", () => {
    dialog.close();
  })
})();
