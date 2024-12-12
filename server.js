const app = require('./app');
// connects to the db
require('./db').connectToMongoDB()


const PORT = 4001;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})