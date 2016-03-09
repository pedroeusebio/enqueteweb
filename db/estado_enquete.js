import knex from 'knex';
const config = require('./config.js');
const db = config.db;

export const getAll =  () => {
    return db('estado_enquete as ee')
        .select()
        .then(r => r);
}

export const getById = (id) => {
    return db('estado_enquete as ee')
        .select()
        .where('ee.id', id)
        .then(r => r[0]);
}
