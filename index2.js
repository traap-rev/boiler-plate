require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../configs/dbconfig.js')[env];

let db = {};

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
    console.log('connecting to db...')
    let database = databases[i];
    let dbPath = config.databases[database];
    db[database] = new Sequelize(
        dbPath.database,
        dbPath.username,
        dbPath.password,
        dbPath
    );
}

/**Add the Database Models**/
fs.readdirSync(__dirname + '/rest')
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        // console.log(db.rest)
        const model = require(path.join(__dirname, `rest/${file}`))(db.rest,
            Sequelize.DataTypes);
        console.log(model)
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
//console.log(db.rest)


module.exports = db;