import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  };

  componentDidMount() {
    this.getBooks();
  }

  async getBooks() {
    const books = await BooksAPI.getAll();

    this.setState({
      books
    });
  }

  async moveToShelf(newBook, shelf) {
    const updatedBooksIds = await BooksAPI.update(newBook, shelf);

    newBook.shelf = shelf;

    this.setState(prevState => ({
      books: prevState.books
        .filter(book => book.id !== newBook.id)
        .concat(newBook)
    }));
  }

  async searchBook(query) {
    if (typeof query !== "undefined" && query !== "") {
      const searchBooks = await BooksAPI.search(query);

      this.setState({
        searchBooks
      });
    }
  }

  render() {
    const { books, searchBooks } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            books ? (
              <ListBooks
                books={this.state.books}
                moveToShelf={this.moveToShelf.bind(this)}
              />
            ) : (
              "Loading..."
            )
          }
        />

        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              books={searchBooks}
              moveToShelf={this.moveToShelf.bind(this)}
              searchBook={this.searchBook.bind(this)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
