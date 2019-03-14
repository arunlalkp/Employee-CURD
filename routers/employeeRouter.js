const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('employee/addOrEdit', { viewTitle: "Insert Employee", button: "Submit"});
})

router.post('/', (req, res) => {
    if (req.body._id === "") {        
        insertRecord(req, res);
    }
    else{
        console.log('else log ' + res);
        updateRecord(req, res);
    }
})


function insertRecord(req, res) {
    let employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, docs) => {
        if(!err) {
            res.redirect('/employee/list');
        } 
        else{
            console.log('error inserting data '+ err);
        }
    })
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (!err) {
            console.log(doc);
            
            res.redirect('employee/list')   
        }
        else{
            console.log('Error during update records ' + err);
        }
    })
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            //console.log(docs);
            
            res.render('employee/list', {list: docs})
        }
        else {
            console.log('error reciving data ' + err);
        }
    })
})

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.render('employee/addOrEdit', {viewTitle: 'Update Employee', employee: docs, button: "Update"})
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc);
            res.redirect('/employee/list')
        }
        else {
            console.log('Error deleting data ' + err);
        }
    })
})

module.exports = router;