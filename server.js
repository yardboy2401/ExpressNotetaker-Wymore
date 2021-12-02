    //requires for express/app/path/api for routes index.js
const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

    //get route for notes.html from public folder
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

    //get route for all other url requests for index.html from public folder
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

    //listen on process.env.PORT or localhost:3001
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });