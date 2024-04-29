const express = require('express');
const database = require('../models');  // will require the index.js file from this directory
const Student = database.Student;  // the student model

const router = express.Router();  // obtain a reference to an express Router object

router.get('/students', function(req, res, next) {
    // query database, get all rows from DB
    // convert to JSON form
    // make available in the then function
    // the findAll method is how we retrieve all records from the model
    Student.findAll({order: ['name']}).then(students => {
        return res.json(students);
    })
})

// defining a post request for the /students page.
router.post('/students', function(req, res, next) {
    const newStudent = req.body;  // reading the body of the request
    console.log(newStudent);
    Student.create(newStudent).then(result => {
        // sending the message: 'New student created!' with the response code 201, which indicates success
        return res.status(201).send('New student created!');
    }).catch(err => {
        // here we are making sure that, in the case a request to post data that does not follow the constraints of the database
        // we are able to catch the issue and resolve it instead of our server crashing
        // 400 is the status code for 'bad request' - user or client has sent invalid data
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map(e => e.message);
            return res.status(400).json(messages);
        } else {
            // this means that this is some other error
            // we will call next, which passes the request onto another callback method that is set up to handle errors
            next(err);
        }
    })
})

// when defining the route, we can use a colon and the name of a placeholder variable to define multiple routes
router.patch('/students/:id', function(req, res, next) {
    // req.params stores the id value
    // stores any placeholders in the url
    const studentID = req.params.id;
    const updatedStudent = req.body;  // updated data about this student
    console.log(updatedStudent);
    // updating the student in the database. The second argument is an object that contains the where clause
    Student.update(updatedStudent, {where: {id: studentID}}).then((result) => {
        const rowsModified = result[0];
        if (rowsModified === 1) {
            return res.send('ok');
        } else {
            // if 0 rows were modified, the student was not found
            // the studentID should always be unique so there should never be multiple rows updated
            return res.status(404).send('Student not found');
        }
    }).catch(err => {  // the database encountered an error, or database reports an error
        // there was invalid data in the updatedStudent object
        // 400 is the status code for 'bad request' - user or client has sent invalid data
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map(e => e.message);
            return res.status(400).json(messages);
        } else {
            // this means that this is some other error
            // we will call next, which passes the request onto another callback method that is set up to handle errors
            next(err);
        }
    })
})

router.delete('/students/:id', function(req, res, next) {
    const studentID = req.params.id;
    Student.destroy({where: {id: studentID}}).then((rowsDeleted) => {
        if (rowsDeleted === 1) {
            return res.send('Student deleted');
        }else {  // if 0 rows were deleted, the student was not found in the database
            return res.status(404).send('Student not found');
        }
        return res.send('Student deleted');
    }).catch(err => {
        return next(err);
    })
})

module.exports = router;