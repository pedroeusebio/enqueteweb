import knex from 'knex';
const config = require('./config.js');
const db = config.db;


export const findOneByFacebook = (facebook_id) => {
	return db('usuario as u')
	.select()
	.where('u.facebook_id', facebook_id) 
	.then(r => r);
}

export const createByFacebook = (user_info) => {
	return db('usuario').insert(user_info).then(r => r);
}