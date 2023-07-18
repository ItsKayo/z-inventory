const express = require('express')
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV||'development'])
const cors = require('cors')

const port = 3001
const app = express();

app.use(express.json())
app.use(cors())

// Users //
app.get('/users', (req, res) => {
    knex('users').select('*')
    .then(data => res.send(data))
})

app.get('/users/:userid', (req, res) => {
    knex('users').select('users.first_name', 'users.last_name').where('users.id' , '=', req.params.userid)
    .then(data => res.send(data))
})

app.post('/users', async (req, res) => {
    const newUser = req.body
    
    try {
        const user = await knex('users').insert(newUser)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.patch('/users/:id', (req, res) => {
    knex('users').where({id: req.params.id}).update(req.body).returning('*')
        .then(res.send('Updated successfully'))
        .catch(err => res.send(err))
})

app.put('/users/:id', (req, res) => {
    knex('users').where({id: req.params.id}).update({
        first_name: req.body.first_name || null,
        last_name: req.body.last_name || null,
        username: req.body.username || null,
        password: req.body.password || null
    }).returning('*')
    .then(res.send('Updated successfully'))
    .catch(err => res.send(err))
})

app.delete('/users/:id', (req, res) => {
    knex('users').where({id: req.params.id}).del()
    .then(res.send('Deleted successfully'))
    .catch(err => res.send(err))
})

// Items //
app.get('/items', (req, res) => {
    knex('items').select('*')
    .then(data => res.send(data))
})

app.get('/items/:userid', (req, res) => {
    knex('items').join('users', 'users.id', '=', 'items.user_id')
    .select('*').where('items.user_id', '=', req.params.userid)
    .then(data => res.send(data))
})

app.post('/items', async (req, res) => {
    const newItem = req.body
    
    try {
        const user = await knex('items').insert(newItem)
        res.status(201).send(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.patch('/items/:id', (req, res) => {
    knex('items').where({id: req.params.id}).update(req.body).returning('*')
        .then(res.send('Updated successfully'))
        .catch(err => res.send(err))
})

app.put('/items/:id', (req, res) => {
    knex('items').where({id: req.params.id}).update({
        user_id: req.body.user_id || null,
        item_name: req.body.item_name || null,
        description: req.body.description || null,
        quantity: req.body.quantity || null
    }).returning('*')
    .then(res.send('Updated successfully'))
    .catch(err => res.send(err))
})

app.delete('/items/:id', (req, res) => {
    knex('items').where({id: req.params.id}).del()
    .then(res.send('Deleted successfully'))
    .catch(err => res.send(err))
})

app.listen(port, () => console.log(`Express server listening on port ${port}`))