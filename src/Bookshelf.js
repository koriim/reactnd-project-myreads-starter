import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class Bookshelf extends Component {

  static propTypes = {
    shelfName: PropTypes.string,
    books: PropTypes.array.isRequired // of book objects
  }

  render() {
    const { books, moveBook, shelfName } = this.props
    return (
      <div className="bookshelf">
        {this.renderShelfName()}
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length
              ? books.map((book) => (
                  <Book key={book.id} book={book} moveBook={moveBook} />
                ))
              : this.renderEmptyShelf(shelfName)
            }
          </ol>
        </div>
      </div>
    );
  }

  renderShelfName() {
    const shelfName = this.props.shelfName
    return (shelfName)
      ? <h2 className="bookshelf-title">{shelfName}</h2>
      : null
  }

  renderEmptyShelf(shelf) {
    return (!shelf)
      ? (<div className="no-search-results">No search results found</div>)
      : (<li className="empty-bookshelf"></li>)
  }
}

export default Bookshelf
