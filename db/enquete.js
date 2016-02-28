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
	return db('enquete as e')
	.insert(element)
	.then(r => r);
}