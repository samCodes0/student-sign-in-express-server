const {Sequelize, DataTypes} = require('sequelize');
const configJson = require('../config.json');  // importing the configJson file
const createStudentModel = require('./student.js');

// look for an environment variable. Will be called NODE_ENV and read its value
// environment variables are variables that are set for your whole computer (or server)
// any application running on this computer (or server) can read these environment variables
// At azure, we'll create an environment variable for your server called NODE_ENV and set it to "production"
// if there is not NODE_ENV set, like on your computer, we'll use the value 'development'
const env = process.env.NODE_ENV || "development";  // sets env to the node environment if running from node
// reading the environment variable that we set in azure for the password for the database connection
const dbPassword = process.env.DB_PASSWORD;

const config = configJson[env];  // read the configuration object for 'development' or 'production'
config.password = dbPassword;
const sequelize = new Sequelize(config);  // creating a new Sequelize object using the config object we created

const database = {  // this looks weird but it is how we define databases in sequelize
    sequalize: sequelize,
    Sequelize: Sequelize
}

// using the function we imported from student.js and passing the variables defined in this file.
const studentModel = createStudentModel(sequelize, DataTypes);
const studentModelName = studentModel.name;  // 'Student'
database[studentModelName] = studentModel;

module.exports = database;