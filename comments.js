// Create web server
// import express
const express = require('express');
// create express app
const app = express();
// import body-parser
const bodyParser = require('body-parser');
// import comments.js
const comments = require('./comments');
// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /comments
// get all comments
app.get('/comments', (req, res) => {
  res.send(comments.getComments());
});

// POST /comments
// create a new comment
app.post('/comments', (req, res) => {
  const { comment } = req.body;
  if (comment) {
    const id = comments.createComment(comment);
    res.status(201).send({ id });
  } else {
    res.status(400).send({ message: 'Comment is required' });
  }
});

// PUT /comments/:id
// update a comment
app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  if (comment) {
    comments.updateComment(parseInt(id), comment);
    res.status(200).send({});
  } else {
    res.status(400).send({ message: 'Comment is required' });
  }
});

// DELETE /comments/:id
// delete a comment
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments.deleteComment(parseInt(id));
  res.status(200).send({});
});

// listen to port 3000
app.listen(3000, () => {
  console.log('Server is running');
});
// Run the web server
// Run the web server using the following command:
// node comments.js
// Now you can use the web server to create, read, update, and delete comments.

// Create a new comment
// To create a new comment, you can send a POST request to /comments with the comment in the request body. For example:
// curl -X POST -d "comment=Hello" http://localhost:3000/comments
// The server will respond with the ID of the new comment. For example:
// {"id":1}
// Get all comments
// To get all comments, you can send a GET request to /comments. For example:
// curl http://localhost:3000/comments
// The server will respond with all

