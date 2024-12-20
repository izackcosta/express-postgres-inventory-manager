const {Pool} = require('pg');

const {CONNECTION_STRING} = process.env;

module.exports = new Pool({
    connectionString: CONNECTION_STRING
});