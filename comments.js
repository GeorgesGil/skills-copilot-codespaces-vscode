// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

// Store comments
const commentsByPostId = {};

// Get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Add comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  // Get comments from a post
  const comments = commentsByPostId[req.params.id] || [];
  // Add comments
  comments.push({ id: commentId, content });
  // Update comments
  commentsByPostId[req.params.id] = comments;
  // Send comments
  res.status(201).send(comments);
});

// Listen to port
app.listen(4001, () => {
  console.log('Listening on 4001');
});