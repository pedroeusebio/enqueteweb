import knex from 'knex';
const config = require('./config.js');
const db = config.db;

export const create = (question_info) => {
    return db('pergunta')
        .insert(question_info)
        .then(r => r);
}
