const express = require('express');
const AuthRoutes = require('./routes/auth.routes');
const PostRoutes = require('./routes/post.routes');


const app = express();

app.use(express.json())

// define routes
app.use('/auth', AuthRoutes);
app.use('/posts', PostRoutes)


app.get('/', (req, res) => {
    // res.json({ message: 'Welcome to Feed App Api'})
    res.json({ message: 'Welcome to Feed App Api'})
})

// Handle asynchronous error using error middleware
app.use((error, req, res, next) => {
    console.log("Error Handling Middleware called")
    console.log('Path: ', req.path)
    console.error('Error: ', error)
   
    if (error.type == 'NOT_FOUND')
        res.status(500).send(error)
     else if (error.type == 'Not Found') // arbitrary condition check
        res.status(404).send(error)
    else {
        res.status(500).send(error)
    }

    next() // next is required to call next middleware if any
})

app.get('*', (req, res) => {
    res.json({ message: 'Route not found', code: 404 })
})



module.exports = app;
