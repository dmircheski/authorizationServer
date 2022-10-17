require('dotenv').config()
const express = require('express')
const dbConfig = require('./config/mongodb.config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
let port = process.env.PORT || 4000


const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the databse. Exiting now... ', err);
    process.exit;
})

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Authentication API ! " })
});

require('./routes/user.routes')(app)
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});