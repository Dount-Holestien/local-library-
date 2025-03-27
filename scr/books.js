const findAuthorById = (authors, id) => authors.find((author) => author.id === id);

const findBookById = (books, id) => books.find((book) => book.id === id);

// Finds all books by a specific author using filter()
const getBooksByAuthor = (books, authorId) => books.filter(({ authorId: id }) => id === authorId);

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (acc, book) => {
      const [borrowed, returned] = acc;
      const { returned: isReturned } = book.borrows[0];
      isReturned ? returned.push(book) : borrowed.push(book);
      return acc;
    },
    [[], []]
  );
}

function getBorrowersForBook(book, accounts) {
  const accountsById = accounts.reduce((acc, { id, ...rest }) => {
    acc[id] = { id, ...rest };
    return acc;
  }, {});

  return book.borrows
    .map(({ id, returned }) => ({
      ...accountsById[id],
      returned,
    }))
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  getBooksByAuthor,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
