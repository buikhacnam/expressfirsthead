const express = require('express');
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const moment = require("moment");
const members = require("./Members");



// Handlebars Middleware (copy from github):
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Homepage Route. this overide static because it's up here
app.get("/", (req, res) => res.render("index", {title: "Member app", members}));

//Middlewate is just a function that has access to req and res, so you can change thing, you can add thing.
// create a logging Middleware function:
const logger =  (req, res, next) => {
    // every time you make a request, the terminal will appear "say hi..."
    // http://localhost:5000/api/members
    console.log("say hi from middleware");
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`);
    next();
}
//in order to initialize middleware:
 app.use(logger);

 //parent route of api route:  members API Routes
 app.use('/api/members', require('./routes/api/members'))

// create a route
//when you want to go to the web, use get request
// app.get('/', (req, res) => {
//    //res.send("<h1>Hello World!!!<h1>");
//    res.sendFile(path.join(__dirname, "public", "index.html")); 
// });





//Set static folder
// "use" when you want to include Middleware, point to the folder that set as a static folder (public)
app.use(express.static(path.join(__dirname, "public")))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

