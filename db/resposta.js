import knex from 'knex';
const config = require('./config.js');
const db = config.db;

export const create = (answer_info, pergunta_id) => {
    if(answer_info != '') {
        let answer = {resposta: answer_info, pergunta_id: pergunta_id};
        return db('resposta')
            .insert(answer)
            .return({inserted: true});
    }
}

export const computeVote = (answer) => {
    let votos = answer.votos + 1;
    return db('resposta')
        .update({votos: votos})
        .where('resposta.id', answer.id)
        .return({inserted: true});
}


export const getById = (answer_id) => {
    return db('resposta as r')
        .select()
        .where('r.id',answer_id)
        .then(r => r);
}
