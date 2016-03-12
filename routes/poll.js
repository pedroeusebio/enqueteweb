var express = require('express');
var router = express.Router();
import R from 'ramda';
var estado_enquete = require('../db/estado_enquete.js');
var pergunta =  require('../db/pergunta.js');
var resposta = require('../db/resposta.js');
var enquete =  require('../db/enquete.js');
var respondente =  require('../db/respondente.js');

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('info', 'Entre no Sistema para realizar a Operação');
        res.redirect('/auth');
    }
}

router.get('/create', isLogged, (req, res) => {
    estado_enquete.getAll().then(r => {
        let estado = r;
        console.log(r);
        let error = req.flash('error')[0];
        let user = req.user;
        res.render('create_enquete', {estado_enquete : estado, error: error, user: user});
    });
});

router.post('/create', isLogged, (req, res) => {
    console.log(req.body);
    if( !('answer' in req.body)) {
        req.flash('error', 'Enquete não possui nenhuma resposta');
        res.redirect('/enquete/create');
        return;
    }
    if(!('pergunta' in req.body) || req.body.pergunta == '') {
        req.flash('error', 'Enquete não possui Pergunta');
        res.redirect('/enquete/create');
        return;
    }
    if(!('name' in req.body) || req.body.name == '' ) {
        req.flash('error', 'Enquete não possui Nome');
        res.redirect('/enquete/create');
        return;
    }
    if(!('date' in req.body) || req.body.date == '') {
        req.flash('error', 'Enquete não possui data de encerramento');
        res.redirect('/enquete/create');
        return;
    }
    let resposta_aleatorio = ('resposta_aleatorio' in req.body) ? 1: 0;
    console.log(req.body, req.user);
    let question = {pergunta: req.body.pergunta,
                    resposta_aleatorio: resposta_aleatorio};
    let user = req.user;
    console.log(question, resposta_aleatorio);
    pergunta.create(question).then(r => {
        let answers = req.body.answer;
        R.map(answer => resposta.create(answer, r[0]), answers);
        let date = new Date();
        let poll = {data_criacao: date, pergunta_id: r[0],
                    usuario_id: user.id, name: req.body.name,
                    tipo_estado_id: req.body.estado_enquete,
                    data_fim:req.body.date};
        enquete.create(poll).then(r => {
            res.redirect('/');
        });
    });

});

router.get('/', isLogged, (req,res) => {
    enquete.getAll().then(r => {
        let enquetes = r;
        let user =  req.user;
        let error = {};
        let success = {};
        for(var i = 0; i< enquetes.length; i++) {
            let respostas = enquetes[i].respostas.split('----');
            let id_respostas = enquetes[i].respostas_id.split(';');
            let resposta_obj = new Array();
            for (var j = 0; j < respostas.length; j++) {
                resposta_obj.push({id: id_respostas[j], resposta: respostas[j]});
            }
            enquetes[i].respostas = resposta_obj;
        }
        let error_message = req.flash('error')[0];
        let success_message = req.flash('success')[0];
        if(!(error_message == undefined)) {
            error = {message: error_message,
                     enquete_id: req.flash('enquete_id')[0]};
            console.log(error);
            res.render('enquete', {enquetes: enquetes, user: user, error: error});
            return;
        } else if(!(success_message == undefined)) {
            success = {message: success_message,
                       enquete_id: req.flash('enquete_id')[0]};
            console.log(success);
            res.render('enquete', {enquetes: enquetes, user: user, success: success});
            return;
        } else {
            console.log('sem erro e sucesso');
            res.render('enquete', {enquetes: enquetes, user: user});
            return;
        }
    });
});

router.get('/:id', isLogged, (req, res) => {
    enquete.getEntireEnqueteById(req.params.id).then(r => {
        let enquete = r[0];
        //res.render('enquete', {enquete: enquete});
        res.json(enquete);
    });
});

router.post('/vote', isLogged, (req, res) => {
    console.log(req.body);
    req.flash('enquete_id', req.body.enquete_id);
    if(!('vote' in req.body)){
        req.flash('error', 'Selecione uma resposta para Votar');
        res.redirect('/enquete');
        return;
    }
    respondente.getByUserId(req.user.id).then(r => {
        for(var i = 0; i < r.length ; i++) {
            if(r[i].enquete_id == req.body.enquete_id){
                req.flash('error', 'Você já respondeu está enquete');
                res.redirect('/enquete');
                return;
            }
        }
        resposta.getById(req.body.vote).then(r => {
            resposta.computeVote(r[0]);
            respondente.create(req.user.id, req.body.enquete_id);
            req.flash('success','O seu voto foi computado');
            res.redirect('/enquete');
        });
    });


});

module.exports = router;
