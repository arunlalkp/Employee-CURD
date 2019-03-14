const mongoose = require('mongoose');

require('./employee.model');


// to connect Database
mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('mongoDB connected!');
    } else {
        console.log('Error in DB Connection = ' + err)
    }
});

