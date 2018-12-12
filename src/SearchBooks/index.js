import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../Book";
// import { DebounceInput } from "react-debounce-input";

class SearchBooks extends Component {
  state = {
    isSearching: false
  };

  render() {
    const { books, moveToShelf, searchBook } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onKeyUp={e => {
                if (e.currentTarget.value === "") {
                  searchBook(e.currentTarget.value);
                } else if (!this.state.isSearching) { // debounce?
                  this.setState({
                    isSearching: true
                  });
                  searchBook(e.currentTarget.value).then(() => {
                    setTimeout(() => {
                      this.setState({
                        isSearching: false
                      });
                    }, 300);
                  });
                }
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.isArray(books)
              ? books.map((book, i) => {
                  return (
                    <li key={book.id}>
                      <Book book={book} moveToShelf={moveToShelf} />
                    </li>
                  );
                })
              : ""}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
