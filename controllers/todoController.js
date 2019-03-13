var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require('mongoose');

// Connect to the database
var mongoDB = 'mongodb+srv://ducvu:6111097@cluster0-vbiqk.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// Create a copy of "todoSchema"
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = new Todo({item: 'buy flowers'}).save(function (err) {
//     if (err) throw err;
//     console.log('item saved');
// });

/* OR

Todo.create({item: 'buy flowers'}, function (err, Todo) {
    if (err) throw err;
    console.log('item saved');
}); */

// Todo.insertMany([{item: 'buy filmtickets'}, {item: 'go shopping'}], function (err, Todo) {
//         if (err) throw err;
//         console.log('item saved');
//     }
// );

var data = {};

module.exports = function (app) {
    app.get('/todo', (req, res) => {
        // get data from mongoDB and pass it to view
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        //get data from the view and add it to mongoDB
        Todo(req.body).save(function (err) {
            if (err) throw err;
            res.json(data);
        });
        console.log("Item submitted !");
    });

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne((err, data) => {
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter((todo) => todo.item.replace(/ /g, '-') !== req.params.item);
    });
};