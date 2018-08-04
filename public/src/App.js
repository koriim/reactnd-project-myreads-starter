import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelves from './Bookshelves.js'
import SearchBooks from './SearchBooks.js'
import './App.css'

class BooksApp extends React.Component {

  state = {
    savedBooks: [] // books user has added to a shelf
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      savedBooks: books
    }))
  }

  moveBook = (book) => {
    BooksAPI.update(book, book.shelf).then(() => {
      var bookAlreadySaved = this.state.savedBooks.find((savedBook) => {
        return savedBook.id === book.id;
      })
      bookAlreadySaved
        ? this.updateExistingSavedBook(book)
        : this.addNewSavedBook(book)
    })
  }

  addNewSavedBook = (book) => {
    this.setState((prevState) => ({
      savedBooks: prevState.savedBooks.concat([book])
    }))
  }

  updateExistingSavedBook = (book) => {
    let savedBooks = this.state.savedBooks
    const index = savedBooks.findIndex((savedBook) => (savedBook.id === book.id))
    savedBooks[index].shelf = book.shelf
    this.setState(() => ({
      savedBooks: savedBooks
    }))
  }

  render() {
    const { savedBooks } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Bookshelves savedBooks={savedBooks} moveBook={this.moveBook} />
        )}/>
        <Route exact path='/search' render={() => (
          <SearchBooks savedBooks={savedBooks} moveBook={this.moveBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
