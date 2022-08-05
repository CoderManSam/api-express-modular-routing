const express = require('express')
const {films} = require('../../data')

const filmsRouter = express.Router()


filmsRouter.get('/', (req, res) => {

    res.json({"films": films})
})
  
  
filmsRouter.post('/', (req,res) => {

    const {title, director} = req.body

    const existingTitle = (element) => element.title === title
    const titleAlreadyExists = films.some(existingTitle)

    if(titleAlreadyExists) {
        return res.status(409).json({error: "A film with the provided title already exists"})
    }


    if(!title || !director) {
        return res.status(400).json({error: "Missing fields in request body"})
    }
  
    const newId = films.length + 1
  
    const film = {...req.body, "id": newId}
  
    films.push(film)
  
    res.status(201).json({"film": film})
})


filmsRouter.get('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const film = films.find(film => film.id === idAsNumber);

    if(!film) {
        return res.status(404).json({error: "A film with the provided ID does not exist"})
    }

    res.json({"film": film})
})


filmsRouter.delete('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const filmIndex =  films.findIndex(function (film) {
        return film.id === idAsNumber;
    });

    const film = films[filmIndex]

    if(!film) {
        return res.status(404).json({error: "A film with the provided ID does not exist"})
    }

    films.splice(filmIndex, 1)

    res.json({"film": film})
})


filmsRouter.put('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const filmIndex =  films.findIndex(function (film) {
        return film.id === idAsNumber;
    });

    const oldFilm = films.find(film => film.id === idAsNumber);

    if(!oldFilm) {
        return res.status(404).json({error: "A film with the provided ID does not exist"})
    }

    const {title} = req.body

    const existingTitle = (element) => element.title === title
    const titleAlreadyExists = films.some(existingTitle)

    if(titleAlreadyExists) {
        return res.status(409).json({error: "A film with the provided title already exists"})
    }

    const updatedFilm = {...req.body,  
        id: oldFilm.id
    }

    films.splice(filmIndex, 1, updatedFilm)

    res.json({"film": updatedFilm})
})


filmsRouter.patch('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const filmIndex =  films.findIndex(function (film) {
        return film.id === idAsNumber;
    });

    const oldFilm = films.find(film => film.id === idAsNumber);

    if(!oldFilm) {
        return res.status(404).json({error: "A film with the provided ID does not exist"})
    }

    const {title, director} = req.body

    const existingTitle = (element) => element.title === title
    const titleAlreadyExists = films.some(existingTitle)

    if(titleAlreadyExists) {
        return res.status(409).json({error: "A film with the provided title already exists"})
    }

    const updatedFilm = {...oldFilm,  
        ...req.body
    }

    // const updatedFilm = {...req.body,  
    //     id: oldFilm.id
    // }

    console.log(updatedFilm)

    films.splice(filmIndex, 1, updatedFilm)

    res.json({"film": updatedFilm})
})


module.exports = filmsRouter