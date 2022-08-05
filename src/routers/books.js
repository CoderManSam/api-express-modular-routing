const express = require('express')
const {books} = require('../../data')

const booksRouter = express.Router()


booksRouter.get('/', (req, res) => {

    res.json({"books": books})
})
  
  
booksRouter.post('/', (req,res) => {
  
    const newId = books.length + 1
  
    const book = {...req.body, "id": newId}
  
    books.push(book)
  
    res.status(201).json({"book": book})
})


booksRouter.get('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const book = books.find(book => book.id === idAsNumber);

    res.json({"book": book})
})


booksRouter.delete('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const bookIndex =  books.findIndex(function (book) {
        return book.id === idAsNumber;
    });

    const book = books[bookIndex]

    books.splice(bookIndex, 1)

    res.json({"book": book})
})


booksRouter.put('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const bookIndex =  books.findIndex(function (book) {
        return book.id === idAsNumber;
    });

    const oldBook = books.find(book => book.id === idAsNumber);

    const updatedBook = {...req.body,  
        id: oldBook.id
    }

    books.splice(bookIndex, 1, updatedBook)

    res.json({"book": updatedBook})
})


module.exports = booksRouter