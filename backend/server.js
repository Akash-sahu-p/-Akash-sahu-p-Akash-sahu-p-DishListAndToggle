const express = require('express');
const mongoose = require('mongoose');

const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config()

const { getallDishes, toggleStatus ,directtoggleDishStatus} = require("./controller/dishcontroller");

const app = express();

const server = http.createServer(app);
const io = socketIo(server); 






app.use(express.json());

// Routes
app.get('/api/dishes', getallDishes);
app.patch('/api/dishes/:id/toggle', toggleStatus);
app.get('/directupdate/dishes/:id/toggle', async (req,res) => {
  try {
    const updatedDish = await directtoggleDishStatus(req.params.id);
    io.emit('dishUpdated', updatedDish); 
    res.status(200).send(updatedDish);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }

})

// Start the server

// console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    
    server.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
