const express = require('express')
const {books} = require('../../data')

const booksRouter = express.Router()


booksRouter.get('/', (req, res) => {

    res.json({"books": books})
})
  
  
booksRouter.post('/', (req,res) => {

    const {title, type, author} = req.body

    const existingTitle = (element) => element.title === title
    const titleAlreadyExists = books.some(existingTitle)

    if(titleAlreadyExists) {
        return res.status(409).json({error: "A book with the provided title already exists"})
    }


    if(!title || !type || !author) {
        return res.status(400).json({error: "Missing fields in request body"})
    }
  
    const newId = books.length + 1
  
    const book = {...req.body, "id": newId}
  
    books.push(book)
  
    res.status(201).json({"book": book})
})


booksRouter.get('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const book = books.find(book => book.id === idAsNumber);

    if(!book) {
        return res.status(404).json({error: "A book with the provided ID does not exist"})
    }

    res.json({"book": book})
})


booksRouter.delete('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const bookIndex =  books.findIndex(function (book) {
        return book.id === idAsNumber;
    });

    const book = books[bookIndex]

    if(!book) {
        return res.status(404).json({error: "A book with the provided ID does not exist"})
    }

    books.splice(bookIndex, 1)

    res.json({"book": book})
})


booksRouter.patch('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const bookIndex =  books.findIndex(function (book) {
        return book.id === idAsNumber;
    });

    const oldBook = books.find(book => book.id === idAsNumber);

    if(!oldBook) {
        return res.status(404).json({error: "A book with the provided ID does not exist"})
    }

    const {title} = req.body

    const existingTitle = (element) => element.title === title
    const titleAlreadyExists = books.some(existingTitle)

    if(titleAlreadyExists) {
        return res.status(409).json({error: "A book with the provided title already exists"})
    }

    const updatedBook = {...oldBook,  
        ...req.body
    }

    // const updatedBook = {...req.body,  
    //     id: oldBook.id
    // }

    books.splice(bookIndex, 1, updatedBook)

    res.json({"book": updatedBook})
})


module.exports = booksRouter