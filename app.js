require('dotenv').config()

//declaration
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

//common controllers
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var supsignup = require('./controllers/suppliersignup');
var suplogin = require('./controllers/supplierlogin');
var suplogout = require('./controllers/supplierlogout');

//admin controllers
var admin = require('./controllers/admin');

//customer controllers
var customer = require('./controllers/customer');

//supplier controllers
var supplier = require('./controllers/supplier');

//configure
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'my top secret pass', resave: false, saveUninitialized: true}));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));


app.use('*', function(req, res, next){

	if(req.originalUrl == '/login' || req.originalUrl == '/signup' || req.originalUrl == '/suplogin' || req.originalUrl== '/supsignup')
	{
		next();
	}
	else
	{
		if(!req.session.admin && !req.session.customer && !req.session.supplier)
		{
			res.redirect('/login');
			return;
		}
		next();
	}
});


//routes
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/supsignup',supsignup);
app.use('/suplogin',suplogin);

//admin routes
app.use('/admin', admin);

//customer routes
app.use('/customer', customer);

//supplier routes
app.use('/supplier', supplier);

//server start
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
