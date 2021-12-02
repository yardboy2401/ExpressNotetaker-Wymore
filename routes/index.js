    //index routes for express/notes/
const express = require('express');

const notes = require('./notes');

const app = express();

    //middleware for using notes.js
app.use('/notes', notes);

    //export app
module.exports = app;