var express = require('express');
var bodyParser = require('body-parser');
var counter = require('./counter.js');
var feedback = require('./feedback.js');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');

// parse application/json
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.use(function(request, response, next) {
    counter.increment(request);
    next();
});

app.get('/', function(request, response) {
//    response.send('Hey, something went terribly wrong!')
    response.render('index', {title: 'Home', counter: counter.get()})
});

app.get('/about', function(request, response) {
    response.render('about', {title: 'About', counter: counter.get()})
});

app.get('/gallery', function(request, response) {
    response.render('gallery', {title: 'Gallery', counter: counter.get()})
});

app.get('/feedback', function(request, response) {
//    feedback.eraseComments();
//    feedback.eraseUsers();
    response.render('feedback', {title: 'Feedback', counter: counter.get(), comments: feedback.get()});
});

app.post('/feedback', function(request, response) {
    feedback.add(request, function (){
        response.render('feedback', {title: 'Feedback', counter: counter.get(), comments: feedback.get()});
    });
//    dialog.info(error, "Error");   
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
