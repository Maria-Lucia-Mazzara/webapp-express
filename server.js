
const express = require('express')
const app = express()
const port = 3000
const film_sql = require('./data/film_sql')
const cors = require('cors');

app.use(express.static('public'))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('Rotta pricipale')
})

app.get('/film', index)

app.get('/film/:id', show)

app.post('/film/:id/recensione', recensione)


function index(req, res) {
    const sql = 'SELECT * FROM movies'
    film_sql.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: err
        });
        res.json(results)
    })
}

function show(req, res) {
    const id = req.params.id
    const sql = 'SELECT * FROM movies WHERE id = ?'
    const sql_rec = 'SELECT * FROM reviews WHERE movie_id = ?'
    film_sql.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: err
        });
        if (results.length === 0) return res.status(404).json({
            error: 'Film not found'
        });
        film_sql.query(sql_rec, [id], (err1, results1) => {
            if (err1) return res.status(500).json({
                error: err1
            });
            const risposta = { ...results[0], reviews: results1 }
            res.json(risposta)
        })
    })

}

function recensione(req, res) {
    const id = Number(req.params.id)
    const { name, text, vote } = req.body


    const sql = 'INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)'
    film_sql.query(sql, [id, name, text, vote], (err) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        res.status(201).json({ message: "Review created" })
    })
}
