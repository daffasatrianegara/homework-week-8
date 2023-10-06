var express = require('express')
var get = require('./getdata.js')
var pool = require('./conn/connection.js')
var app = express()

pool.connect((err, res) => {
    if(err) {
        console.log(err)
    }
    console.log('connected...')
})

app.get('/hasilseeding', get.getseeding)
app.get('/listfilm', get.getListFilm)
app.get('/film/:id', get.getFilmbyid)
app.get('/listcategory', get.getListCategory)
app.get('/film/category/:name', get.getListFilmCategorybyid)
app.get('/cekmigrate', get.getActor)

app.listen(3000)