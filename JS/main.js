function getBooksFromStorage() {
  const books = JSON.parse(localStorage.getItem("books"));
  return books || [];
}

function saveBooksToStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function displayBook(book) {
  const bookList = book.isComplete ? document.getElementById("completeBookshelfList") : document.getElementById("incompleteBookshelfList");
  const bookItem = document.createElement("article");
  bookItem.classList.add("book_item");

  const bookTitle = document.createElement("h3");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `Penulis: ${book.author}`;

  const bookYear = document.createElement("p");
  bookYear.textContent = `Tahun: ${book.year}`;

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");

  const actionButton = document.createElement("button");
  actionButton.textContent = book.isComplete ? "Belum selesai di Baca" : "Selesai dibaca";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus buku";

  actionButton.addEventListener("click", () => {
    book.isComplete = !book.isComplete;
    saveBooksToStorage(books);
    renderBooks(books);
  });

  deleteButton.addEventListener("click", () => {
    const bookIndex = books.findIndex((item) => item.id === book.id);
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      saveBooksToStorage(books);
      renderBooks(books);
    }
  });

  actionContainer.appendChild(actionButton);
  actionContainer.appendChild(deleteButton);

  bookItem.appendChild(bookTitle);
  bookItem.appendChild(bookAuthor);
  bookItem.appendChild(bookYear);
  bookItem.appendChild(actionContainer);

  bookList.appendChild(bookItem);
}

function renderBooks(books) {
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  const completeBookshelfList = document.getElementById("completeBookshelfList");

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  for (const book of books) {
    displayBook(book);
  }
}

function addBook() {
  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = Number(document.getElementById("inputBookYear").value);
  const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

  const newBook = {
    id: +new Date(),
    title: inputBookTitle,
    author: inputBookAuthor,
    year: inputBookYear,
    isComplete: inputBookIsComplete,
  };

  books.push(newBook);
  saveBooksToStorage(books);
  renderBooks(books);

  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;
}

function searchBooks() {
  const searchBookTitle = document.getElementById("searchBookTitle").value;
  const results = books.filter((book) => book.title.toLowerCase().includes(searchBookTitle.toLowerCase()));
  renderSearchResults(results);
}

function renderSearchResults(results) {
  const searchResults = document.getElementById("searchResults");

  searchResults.innerHTML = "";

  if (results.length === 0) {
    searchResults.textContent = "Buku tidak ditemukan.";
  } else {
    for (const book of results) {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");

      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = `Penulis: ${book.author}`;

      const bookYear = document.createElement("p");
      bookYear.textContent = `Tahun: ${book.year}`;

      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(bookYear);

      searchResults.appendChild(bookItem);
    }
  }
}

document.getElementById("searchBook").addEventListener("submit", (e) => {
  e.preventDefault();
  searchBooks();
});

document.getElementById("inputBook").addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
});

let books = getBooksFromStorage();
renderBooks(books);
