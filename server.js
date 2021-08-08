//-----DECLATATIONS-----//
const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

//-----MIDDLEWARE-----//
//Parse incoming string or array
app.use(express.urlencoded({extended: true}));
//Parse incoming Json data
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(PORT, () => console.log('NOW LISTENING'));
