const express = require('express')
const {films} = require('../../data')

const filmsRouter = express.Router()


filmsRouter.get('/', (req, res) => {

    res.json({"films": films})
})
  
  
filmsRouter.post('/', (req,res) => {
  
    const newId = films.length + 1
  
    const film = {...req.body, "id": newId}
  
    films.push(film)
  
    res.status(201).json({"film": film})
})


filmsRouter.get('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const film = films.find(film => film.id === idAsNumber);

    res.json({"film": film})
})


filmsRouter.delete('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const filmIndex =  films.findIndex(function (film) {
        return film.id === idAsNumber;
    });

    const film = films[filmIndex]

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

    const updatedFilm = {...req.body,  
        id: oldFilm.id
    }

    films.splice(filmIndex, 1, updatedFilm)

    res.json({"film": updatedFilm})
})


module.exports = filmsRouter