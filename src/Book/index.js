import React, { Component } from "react";

class Book extends Component {
  state = {
    shelf: this.props.book.shelf
  }

  changeEvent(e) {
    this.props.moveToShelf(this.props.book, e.currentTarget.value);
    this.setState({
      shelf: e.currentTarget.value
    })
  }

  render() {
    const { book } = this.props;
    
    return (
      <div className="book" data-id={book.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={e => this.changeEvent.call(this, e)}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(", ")}</div>
      </div>
    );
  }
}

export default Book;
