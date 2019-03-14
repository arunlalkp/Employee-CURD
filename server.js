const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const employeeRouter = require('./routers/employeeRouter');
require('./models/db');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}))
app.set('view engine', 'hbs');



app.listen(5000, () => {
    console.log('Express server running on port 5000');
})

app.use('/employee', employeeRouter);