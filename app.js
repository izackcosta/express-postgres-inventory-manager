const express = require('express');

const app = express();

//Load enviroment variables
require('dotenv').config();

//Routes
const indexRouter = require('./routes/indexRouter');
const categoriesRouter = require('./routes/categoriesRouter');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use('/categories', categoriesRouter);

const {PORT} = process.env;

app.listen(PORT, ()=>{console.log(`server listening on port ${PORT}`)});