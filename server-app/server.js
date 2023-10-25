//require('dotenv').config(); // Load environment variables from .env file
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
const PORT = 5000;

import { getNotes, getNote, createNote } from './database.js'

const app = express()

app.use(express.json())
app.use(cors());
//app.use(express.static('public'))
// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, '../client-app/build')));


app.use(express.static('../client-app/build'))

const postsList = [
    {
        id: "1",
        title: "Post 1 Title",
        subTitle: 'aliquam ultrices sagittis',
        shortText: 'gravida in fermentum et sollicitudin ac orci phasellus',
    },
    {
        id: "2",
        title: "Post 2 Title",
        subTitle: 'volutpat commodo sed egestas',
        shortText: 'risus nec feugiat in fermentum posuere urna nec'
    },
    {
        id: "3",
        title: "Post 3 Title",
        subTitle: 'volutpat commodo sed egestas',
        shortText: 'risus nec feugiat in fermentum posuere urna nec'
    }
];

//app.get('/', (req, res) => {
//   res.send('Root')
//})

app.get('/api', (request, response) => {
    response.send({ message: "Connected" });
})

app.get('/posts', (request, response) => {
    response.send(postsList);
})

app.get('/post/:id', (request, response) => {
    const post = postsList.find(post => post.id === request.params.id);

    response.send(post);
})

app.get("/notes", async (req, res) => {
  const notes = await getNotes()
  res.send(notes)
})

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await getNote(id)
  res.send(note)
})

// curl -X POST localhost:8080/notes -H 'Content-Type: application/json' -d '{"birth_date":"1985-10-25","first_name":"Santa","last_name":"Clause","gender":"M", "hire_date":"1993-10-25T00:00:00.00"}'
// curl -X POST localhost:8080/notes -H 'Content-Type: application/json' -d '{"birth_date":"1985-10-25","first_name":"Mother","last_name":"Goose","gender":"M", "hire_date":"1993-10-25T00:00:00.00"}'
app.post("/notes",  async (req, res) => {
  console.log("Body - ", req.body);
  const { birth_date, first_name, last_name, gender, hire_date } = req.body;
    /*
    const values = [
    req.body.birth_date,
    req.body.first_name,
    req.body.last_name,
    req.body.gender,
    req.body.hire_date,
  ];
  */
  //console.log("Parameters:", birth_date);
  //console.log("Parameters:", values);
  const note = await createNote(birth_date, first_name, last_name, gender, hire_date)
  console.log("CreateNote Response:", note);
  res.status(201).send(note)
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

// Add error handling middleware that Express will call
// in the event of malformed JSON.
app.use(function(err, req, res, next) {
  // 'SyntaxError: Unexpected token n in JSON at position 0'
  err.message;
  next(err);
});


app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`)
})