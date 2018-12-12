import React, { Component } from "react";

class Book extends Component {
  state = {
    shelf: "none"
  };

  changeEvent(e) {
    this.props.moveToShelf(this.props.book, e.currentTarget.value);
    this.setState({
      shelf: e.currentTarget.value
    });
    this.backToMain();
  }

  backToMain() {
    if (document.getElementsByClassName("close-search").length > 0) {
      document.getElementsByClassName("close-search")[0].click();
    }
  }

  getShelf() {
    return typeof this.props.book.shelf !== "undefined"
    ? this.props.book.shelf
    : "none";
  }

  render() {
    const { book } = this.props;
    const smallThumbnail =
      typeof book.imageLinks !== "undefined" &&
      typeof book.imageLinks.smallThumbnail !== "undefined"
        ? book.imageLinks.smallThumbnail
        : "https://dummyimage.com/128x193/fff/000.png&text=no+cover+image";

    return (
      <div className="book" data-id={book.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${smallThumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.getShelf()}
              onChange={e => this.changeEvent.call(this, e)}
            >
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
        <div className="book-authors">
          {typeof book.authors !== "undefined" ? book.authors.join(", ") : ""}
        </div>
      </div>
    );
  }
}

export default Book;
