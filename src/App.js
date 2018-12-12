import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import NoMatch from "./NoMatch";

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

      return searchBooks;
    } else {
      this.setState({
        searchBooks: []
      });
      return Promise.resolve();
    }
  }

  render() {
    const { books, searchBooks } = this.state;

    return (
      <div className="app">
        <Switch>
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

          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
