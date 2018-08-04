import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf.js'

class SearchBooks extends Component {

  static propTypes = {
    savedBooks: PropTypes.array.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.updateResultsBasedUpon(query)
    this.setState({ query: query })
  }

  updateResultsBasedUpon = (query) => {
    if (query) {
      BooksAPI.search(query).then((books) => {
        if(books.error) {
          this.setState({ results: [] })
        } else {
          this.setState({
            results: this.mergedSavedBooksWith(books)
          })
        }
      });
    } else {
      this.setState({ results: [] })
    }
  }

  /**
   * Merges any savedBooks that have turned up in the search results such that
   * the proper shelf location is displayed from within the search page.
   */
  mergedSavedBooksWith = (books) => (
    books.map((book) => {
      let savedBook = this.props.savedBooks.find((element) => (
        element.id === book.id
      ))
      return savedBook ? savedBook : book ;
    })
  )

  clearQuery = () => {
    this.setState({
      query: '',
      results: []
    })
  }

  render() {
    const { query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-books-input'
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf books={this.state.results} moveBook={this.props.moveBook} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
