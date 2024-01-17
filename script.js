class Book {
  constructor({ title, author, pages, read }) {
    this.title = title;
    this.author = author;
    this.pages = pages;
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

  addBook({ title, author, pages, read }) {
    this.books.push(new Book({ title, author, pages, read }));
  }

  deleteBook(i) {
    this.books.splice(i, 1);
  }

  get bookCount() {
    return this.books.length;
  }
}

function updateTable() {
  let tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
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
      updateTable();
    });
    newDeleteCell.appendChild(newDeleteButton);

    newRead.addEventListener("click", () => {
      book.toggleRead();
    });

    newTitle.innerText = book.title;
    newAuthor.innerText = book.author;
    newPages.innerText = book.pages;
    newRead.innerText = book.read;
  }
}

const library = new Library();

// Dummy entries
library.addBook({
  title: "Dummy Book 1",
  author: "Dummy Author 1",
  pages: 100,
  read: true,
});
library.addBook({
  title: "Dummy Book 2",
  author: "Dummy Author 2",
  pages: 200,
  read: false,
});
updateTable();

// Form dialog

const formController = (() => {
  const dialog = document.querySelector("dialog");
  const showButton = document.getElementById("addButton");
  const submitButton = document.getElementById("submitButton");
  const cancelButton = document.getElementById("cancelButton");

  showButton.addEventListener("click", () => {
    dialog.showModal();
  });

  submitButton.addEventListener("click", (e) => {
    title = document.getElementById("title");
    author = document.getElementById("author");
    pages = document.getElementById("pages");
    read = document.getElementById("read");

    if (title.validity.valueMissing) {
      title.setCustomValidity("You must provide a title.");
      return;
    } else {
      title.setCustomValidity("");
    }
    if (author.validity.valueMissing) {
      author.setCustomValidity("You must provide an author.");
      return;
    } else {
      author.setCustomValidity("");
    }
    if (pages.validity.rangeUnderflow) {
      pages.setCustomValidity("Book must have a page count.");
      return;
    } else {
      pages.setCustomValidity("");
    }

    // Preventing default too early stops the automatic validation
    // But we need it now so the page stays put
    e.preventDefault();

    dialog.close();
    library.addBook({
      title: title.value,
      author: author.value,
      pages: pages.value,
      read: read.checked,
    });
    updateTable();
  });

  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
})();
