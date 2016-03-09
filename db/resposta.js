import knex from 'knex';
const config = require('./config.js');
const db = config.db;

export const create = (answer_info, pergunta_id) => {
    let answer = {resposta: answer_info, pergunta_id: pergunta_id};
    return db('resposta')
        .insert(answer)
        .return({inserted: true});
}
