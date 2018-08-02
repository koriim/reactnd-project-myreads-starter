import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
      book: PropTypes.object.isRequired,
      moveBook: PropTypes.func.isRequired
    }

    handleOptionSelect = (e) => {
      let book = this.props.book
      book.shelf = e.target.value
      this.props.moveBook(book)
    }
    render() {
        const { book } = this.props;
        const coverImageUrl = this.getCoverImageUrlFor(book)
        return (
          <li>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{ width: 128, height: 193, backgroundImage:coverImageUrl }}>
                </div>
                <div className="book-shelf-changer">
                  <select
                    defaultValue={this.getShelfFor(book)}
                    onChange={this.handleOptionSelect}
                  >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want To Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{this.getAuthorsFor(book)}</div>
            </div>
          </li>
        )
      }

      getShelfFor = (book) => {
        return book.shelf ? book.shelf : 'none';
      }

      getCoverImageUrlFor = (book) => {
        let url = '';
        if (book.imageLinks) {
          url = book.imageLinks.smallThumbnail
        }
        return 'url("' + url + '")';
      }

      getAuthorsFor = (book) => {
        return (book.authors) ? book.authors : 'Unknown';
      }

    }

    export default Book