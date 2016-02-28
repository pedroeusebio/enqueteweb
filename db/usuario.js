import knex from 'knex';
const config = require('./config.js');
const db = config.db;


export const findOneByFacebook = (facebook_id) => {
	return db('facebbok as f')
	.select()
	.leftJoin('usuario as u', 'f.usuario_id', 'u.id')
	.where('f.id', facebook_id) 
	.then(r => r);
}

export const createByFacebook = (user_info) => {

}