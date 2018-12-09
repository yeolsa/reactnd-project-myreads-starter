import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {};

  componentDidMount() {
    this._getBooks();
  }

  async _getBooks() {
    const books = await BooksAPI.getAll();

    this.setState({
      books
    });
  }

  async moveToShelf(newBook, shelf) {
    const updatedBooksIds = await BooksAPI.update(newBook, shelf)

    newBook.shelf = shelf

    const books = this.state.books.filter(book => book.id !== newBook.id).concat(newBook)

    this.setState({
      books
    })
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            books ? (
              <ListBooks books={this.state.books} moveToShelf={this.moveToShelf.bind(this)} />
            ) : (
              "Loading..."
            )
          }
        />

        <Route path="/search" render={() => <SearchBooks />} />
      </div>
    );
  }
}

export default BooksApp;
