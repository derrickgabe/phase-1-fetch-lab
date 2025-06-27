// index.js

/**
 * fetchBooks
 *  - Fetches A Song of Ice and Fire books from the public API
 *  - Parses the JSON
 *  - Hands the array of book objects off to renderBooks()
 */
function fetchBooks() {
  return fetch('https://anapioficeandfire.com/api/books')
    .then(response => response.json())
    .then(renderBooks)
    .catch(error => console.error('Error fetching books:', error));
}

/**
 * renderBooks
 *  - Accepts an array of book objects
 *  - Appends an <h2> for each book name inside <main>
 */
function renderBooks(books) {
  const main = document.querySelector('main');
  if (!main) return; // guard for tests that don't mount a <main>

  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.textContent = book.name;
    main.appendChild(h2);
  });
}

/* ------------------------------------------------------------------ */
/* Make the functions discoverable in every test/runtime environment  */
/* ------------------------------------------------------------------ */

// JSDOM / browser globals
if (typeof window !== 'undefined') {
  window.fetchBooks = fetchBooks;
  window.renderBooks = renderBooks;
}

// Plain Node globals (e.g. mocha without jsdom)
if (typeof global !== 'undefined') {
  global.fetchBooks = fetchBooks;
  global.renderBooks = renderBooks;
}

// CommonJS export so `require("./index.js")` works in tests or scripts
if (typeof module !== 'undefined') {
  module.exports = { fetchBooks, renderBooks };
}
