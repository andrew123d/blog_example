const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/database');
const mongoose = require('mongoose');
const cors = require('cors');



const Posts = require('./routes/posts');
const Categories = require('./routes/categories')
   
   
//  Mongoose Promices
mongoose.Promise = global.Promise;
// DB connection
mongoose.connect(config.database, {useNewUrlParser: true});
mongoose.connection.on('connected', function(){
console.log('Connected with DB');
});
mongoose.connection.on('error', function(){
  console.log('Connection with DB error');
});

const app = express();
// Cors MW
app.use(cors());

//bodyParser MW
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


// Port
const port = 3100;

// Busboy
//app.use(busboy());

// Server routes
app.use('/', express.static(path.join(__dirname, 'public'))); 
app.use('/api/posts', Posts );
app.use('/api/cat', Categories);
           
app.get('*', function(req, res){
	res.redirect('http://localhost:3100'); 
});  

app.listen(port, function(){
  console.log('App is running on port '+ port);
});
