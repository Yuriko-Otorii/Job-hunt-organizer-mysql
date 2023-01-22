const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')
const methodOverride = require('method-override');
require('dotenv').config();

const app = express()

app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))

//db connection
const dbConnection = require("./util/mysql");

//import routes
const authRoute = require('./routes/auth.route');
const homeRoute = require('./routes/home.route');

//routes
app.use('/auth', authRoute);
app.use('/home', homeRoute);


const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`)

    const [data] = await dbConnection.query("SELECT 1") 
    if(data) console.log("Successful connection to the MySQL database")
})


