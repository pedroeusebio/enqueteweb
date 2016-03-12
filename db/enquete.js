import knex from 'knex';
const config = require('./config.js');
const db = config.db;

export const get = (selector) => {
	return 	db('enquete as e')
	.select()
	.where(selector)
	.then(r => r);
}

export const update = (id, element) => {
	return db('enquete as e')
	.where('e.id', id)
	.update(element) 
	.then(r => r);
}

export const create = (element) => {
	return db('enquete')
	.insert(element)
	.then(r => r);
}

export const getAll = () => {
    return db('enquete as e')
        .select('e.id','e.name','p.id as pID','p.pergunta', db.raw('group_concat(?? separator "----") as respostas', ['resposta']) )
        .leftJoin('pergunta as p', 'e.pergunta_id', 'p.id')
        .leftJoin('resposta as r', 'p.id', 'r.pergunta_id')
        .leftJoin('imagem as i', 'e.imagem_id', 'i.id')
        .groupBy('e.id')
        .then(r => r);
}

export const getEntireEnqueteById = (id) => {
    return db('enquete as e')
        .select(e.id, p.id )
        .leftJoin('pergunta as p', 'e.pergunta_id', 'p.id')
        .leftJoin('resposta as r', 'p.id', 'r.pergunta_id')
        .leftJoin('imagem as i', 'e.imagem_id', 'i.id')
        .where('e.id',id)
        .then(r => r);
}
