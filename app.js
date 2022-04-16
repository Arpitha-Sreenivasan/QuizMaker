const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(session({
  secret: 'QuizMakerSecretSession',
  saveUninitialized: true,
  resave: true
}));


app.set('layout', './layouts/main');
//app.set('view engine', 'ejs');

const routes = require('./server/routes/quizMakerRoutes.js')
app.use('/', routes);
// app.get("/",(req,res) => {
//   res.sendFile("home.html",{
//       root: './public'
//   });
// });

app.listen(port, ()=> console.log(`Listening to port ${port}`));