const express = require('express');
const AuthRoutes = require('./Routes/auth.routes');
const PostRoutes = require('./Routes/post.routes');

// connects to the db
require('./db').connectToMongoDB()

const PORT = 4001;

const app = express();

app.use(express.json())

// define routes
app.use('/auth', AuthRoutes);
app.use('/posts', PostRoutes)


app.get('/', (req, res) => {
    // res.json({ message: 'Welcome to Feed App Api'})
    res.json({ message: 'Welcome to Feed App Api'})
})

app.get('*', (req, res) => {
    res.json({ message: 'Route not found', code: 404 })
})


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})

