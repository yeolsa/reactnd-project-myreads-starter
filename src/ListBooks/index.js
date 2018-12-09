import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../BookShelf";

class ListBooks extends Component {
  render() {

    const { books, moveToShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={books.filter(
                book => book.shelf === "currentlyReading"
              )}
              moveToShelf={moveToShelf}
            />
            <BookShelf
              title="Want To Read"
              books={books.filter(
                book => book.shelf === "wantToRead"
              )}
              moveToShelf={moveToShelf}
            />
            <BookShelf
              title="Read"
              books={books.filter(
                book => book.shelf === "read"
              )}
              moveToShelf={moveToShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
