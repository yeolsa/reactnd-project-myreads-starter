import React, { Component } from "react";
import Book from "../Book";

class BookShelf extends Component {
  render() {
    const { title, books, moveToShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, i) => {
              return (
                <li key={book.id}>
                  <Book book={book} moveToShelf={moveToShelf} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
