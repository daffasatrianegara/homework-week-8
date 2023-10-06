var pool = require('../conn/connection.js')
var fs = require('fs')

const seedingQuery = fs.readFileSync('db/seeding.sql', {encoding: 'utf-8'});
pool.query(seedingQuery, (err, res) => {
    if(err) {
        console.log(err)
    }
    console.log('seeding complete')
    pool.end()
})