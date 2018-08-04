import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf.js'

/** Class managing the 3 bookshelves required by project */
class Bookshelves extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderShelf('currentlyReading', 'Currently Reading')}
            {this.renderShelf('wantToRead', 'Want To Read')}
            {this.renderShelf('read', 'Read')}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a Book</Link>
        </div>
      </div>
    )
  }

  renderShelf(apiReadableShelfname, humanReadableShelfName) {
    const { moveBook, savedBooks } = this.props
    return (
      <Bookshelf
        shelfName={humanReadableShelfName}
        moveBook={moveBook}
        books={savedBooks.filter((book) => {
          return book.shelf === apiReadableShelfname;
        })}
      />
    )
  }

}

export default Bookshelves
