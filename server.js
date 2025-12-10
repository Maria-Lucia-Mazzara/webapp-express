
const express = require('express')
const app = express()
const port = 3000
const film_sql = require('./data/film_sql')

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('Rotta pricipale')
})

app.get('/film', index)


function index(req, res) {
    const sql = 'SELECT * FROM movies'
    film_sql.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: err
        });
        res.json(results)
    })
}