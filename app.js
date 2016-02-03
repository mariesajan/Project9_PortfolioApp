var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

//Serving static files in public folder
app.use('/javascripts', express.static(path.join(__dirname +
    '/public/javascripts')));
app.use('/stylesheets', express.static(path.join(__dirname +
    '/public/stylesheets')));
app.use('/images', express.static(path.join(__dirname + '/public/images')));

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'mariesajan123',
    database: 'portfolio_database'
});

connection.connect();

app.listen(3000, function() {
    console.log('server is connected');
});

app.post('/admin/update_portfolio/:id', function(req, res) {
    var queryString = "UPDATE PROJECTS_PORTFOLIO SET ? WHERE ID=" + req
        .params.id;
    var postValues = req.body;
    connection.query(queryString, postValues, function(err, results) {
        if (err)
            throw err;
        res.send(results);
    });
});



app.get('/', function(req, res) {
    var absolutePath = relativePathHtml() + 'index.html';
    res.sendFile(absolutePath);
});


function relativePathHtml() {
    return (__dirname + '/public/views/');
}

app.post('/admin/login', function(req, res) {
    var queryString = "SELECT * FROM PORTFOLIO_LOGIN WHERE USERNAME ='" +
        req.body.username + "' AND PASSWORD ='" + req.body.password +
        "'";
    connection.query(queryString, function(err, user) {
        if (err)
            throw err;

        if (user.length > 0) {
            req.session.regenerate(function() {
                req.session.user = user[0].username;
                res.send(user);
            });
        }
    });
});

app.get('/api/portfolio_desc/:id', function(req, res) {
    var queryString = "SELECT * FROM PROJECTS_PORTFOLIO WHERE id=" +
        req.params.id;
    connection.query(queryString, function(err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});

app.get('/admin/logout', restrict, function(req, res, next) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

app.get('/api/projects', function(req, res) {
    var queryString = "SELECT * FROM PROJECTS_PORTFOLIO";
    connection.query(queryString, function(err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});


app.delete('/admin/delete_portfolio/:id', function(req, res, next) {
    var queryString = 'DELETE FROM PROJECTS_PORTFOLIO WHERE ID=' + req.params
        .id;
    connection.query(queryString, function(err, results) {
        if (err)
            throw err;
        res.send(results);
    });
});

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

//Admin part
app.get('/admin', restrict, function(req, res, next) {
    res.sendFile(relativePathHtml() + 'admin.html');
});

app.get('/api/projects/edit/:id', function(req, res) {
    var queryString =
        "SELECT * FROM PROJECTS_PORTFOLIO WHERE ID = ?";
    connection.query(queryString, req.params.id, function(err,
        results) {
        if (err)
            throw err;
        res.send(results[0]);
    });
});

app.get('/admin/add_portfolio', restrict, function(req, res, next) {
    //contains the query string also here for edit...
    res.sendFile(relativePathHtml() + 'add_portfolio.html');
});

app.post('/admin/add_portfolio', function(req, res) {
    var post = req.body;
    var queryString = "INSERT INTO PROJECTS_PORTFOLIO  SET ?";
    connection.query(queryString, post, function(err, result) {
        if (err)
            throw err;
        res.send(result);
    });
});
