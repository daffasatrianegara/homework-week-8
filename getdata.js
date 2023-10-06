var pool = require('./conn/connection.js')

const getseeding = (req, resp) => {
    pool.query('select first_name, last_name from actor where extract(year from last_update) = extract(year from now()) and extract(month from last_update) = extract(month from now()) and extract(day from last_update) = extract(day from now())', (err, results) => {
        if(err) {
            throw err
        }
        const formatResults = JSON.stringify(results.rows, null, 2)
        resp.setHeader('content-type', 'application/json')
        resp.send(formatResults)
    })
}

const getListFilm = (req, resp) => {
    pool.query('select f.title, f.description, f.release_year, l.name as language from film f inner join language l on f.language_id = l.language_id order by f.film_id;', (err, results) => {
        if(err) {
            throw err
        }
        const formatResults = JSON.stringify(results.rows, null, 2)
        resp.setHeader('Content-Type', 'application/json')
        resp.send(formatResults)
    })
}

const getFilmbyid = (req, resp) => {
    const id = parseInt(req.params.id)
    pool.query(`select * from film where film_id = ${id}`, (err, results) => {
        if(err) {
            throw err
        }
        const formatResults = JSON.stringify(results.rows, null, 2)
        resp.setHeader('Content-Type', 'application/json')
        resp.send(formatResults)
    })
}

const getListCategory = (req, resp) => {
    pool.query('select name from category order by category_id', (err, results) => {
        if(err) {
            throw err
        }
        const formatResults = JSON.stringify(results.rows, null, 2)
        resp.setHeader('Content-Type', 'application/json')
        resp.send(formatResults)
    })
}

const getListFilmCategorybyid = (req, resp) => {
    const category = req.params.name
    pool.query(`
    SELECT f.title, f.description, f.release_year, l.name AS language, c.name AS category
    FROM film f
    INNER JOIN language l ON f.language_id = l.language_id
    INNER JOIN film_category fc ON f.film_id = fc.film_id
    INNER JOIN category c ON fc.category_id = c.category_id
    where c.name = '${category}'
    ORDER BY f.film_id;
    `, (err, results) => {
        if(err) {
            throw err
        }
        const formatResults = JSON.stringify(results.rows, null, 2)
        resp.setHeader('Content-Type', 'application/json')
        resp.send(formatResults)
    })
}

const getActor = (req, resp) => {
    pool.query('select * from actor', (err, results) => {
        if(err) {
            throw err
        }
        const formatResults = JSON.stringify(results.rows, null, 2)
        resp.setHeader('Content-Type', 'application/json')
        resp.send(formatResults)
    })
}
module.exports = {
    getseeding,
    getListFilm,
    getFilmbyid,
    getListCategory,
    getListFilmCategorybyid,
    getActor,
}