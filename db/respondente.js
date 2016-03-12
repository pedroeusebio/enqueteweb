import knex from 'knex';
const config = require('./config.js');
const db = config.db;

export const getByUserId = (user_id) => {
    return db('respondente as re')
        .select()
        .where('re.usuario_id', user_id)
        .then(r => r);
}

export const create = (user_id, enquete_id) => {
    let respondente = {usuario_id: user_id, enquete_id: enquete_id};
    return db('respondente')
        .insert(respondente)
        .return({inserted: true});
}
