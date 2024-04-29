module.exports = (sequelize, DataTypes) => {
    // define the model for the student table
    // models are abstractions that represent a table in the database
    const Student = sequelize.define('Student', {
        // define the columns in the database table - giving them a name and a type.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
            // in the future, implement checks for duplicate starID's
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })

    // create or update table in the database if it does not already exist. 
    // This only affects the sqlite database, it doesn't affect the model
    Student.sync({force: false}).then(() => {
        console.log('Synced student table');
    })

    return Student;
}