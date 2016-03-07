import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
const config = require('./config.js');
const db = config.db;
import validator from 'validator';


export const findOneByFacebook = (facebook_id) => {
	return db('usuario as u')
	.select()
	.where('u.facebook_id', facebook_id)
	.then(r => r);
}

export const createByFacebook = (user_info) => {
	return db('usuario').insert(user_info).then(r => r);
}

export const findOneByEmail = (email) => {
	return db('usuario as u')
	.select()
	.where('u.email', email)
	.then(r => r);
}

export const update = (id,user_info) => {
	return db('usuario as u')
	.where('u.id', id)
	.update(user_info)
	.then(r => r);

}

export const checkPassword = (i_pass, db_pass, done) => {
	bcrypt.compare(i_pass, db_pass, done);
}

export const create = (user_info) => {
    return db('usuario').insert(user_info).then(r => r);
}

export const validation = (user_info) => {
    var element = {};
    if(!validator.isEmail(user_info.email)){
        element  = {validate: true, message: 'email não é valido.'};
        return element;
    }/*
    if(!validator.isAlpha(user_info.name)) {
        element = {validator: false, message: 'nome contem caracteres especiais.'};
        return element;
    }*/
    element = {validator: true, message:''};
    return element;
}
