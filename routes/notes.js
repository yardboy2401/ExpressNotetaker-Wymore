const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsutils');
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const dbJson = require('../db/db.json')


// // GET request for notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for a new note to be saved to db.json file
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const id = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(id, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }
  });

notes.delete('/:id', (req, res) => {
    let jsonPath = path.join(__dirname, '../db/db.json')
    let noteId = req.params.id;
    console.log(noteId)
    for (let i = 0; i < dbJson.length; i++) {
        if(noteId == dbJson[i].id) {
            dbJson.splice(i, 1)
            break;
        }
    }
    writeToFile(jsonPath, dbJson)
    res.json(dbJson);
});
  
module.exports = notes;