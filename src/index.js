const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')
const methodOverride = require('method-override');
require('dotenv').config();

const app = express()

app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(methodOverride('_method'))

//db connection
const dbConnection = require("./util/mysql");

//import routes
const authRoute = require('./routes/auth.route');
const homeRoute = require('./routes/home.route');
const sharepageRoute = require('./routes/sharePage.route');

//Check user
const {checkToken} = require('./controller/user.controller')

//routes
app.use('/', authRoute);
app.use(checkToken)
app.use('/home', homeRoute);
app.use('/sharepage', sharepageRoute);

app.use((req, res, next) => {
    res.status(404).render('error', {message: "Request page is not founded...", btnMessage: "Back to home", url: "home"})
})


const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`)

    const [data] = await dbConnection.query("SELECT 1") 
    if(data) console.log("Successful connection to the MySQL database")
})


