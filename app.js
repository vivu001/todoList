var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set up template engine
app.set('view engine', 'ejs');
// Verzeichnis, in welchem EJS die Templates sucht, festlegen (hier: "views")
app.set('views', 'views');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000, () => {
    console.log('You are listening to port 3000...');
});