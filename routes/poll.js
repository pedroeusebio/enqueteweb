var express = require('express');
var router = express.Router();
import R from 'ramda';
var estado_enquete = require('../db/estado_enquete.js');
var pergunta =  require('../db/pergunta.js');
var resposta = require('../db/resposta.js');
var enquete =  require('../db/enquete.js');

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
                    tipo_estado_id: req.body.estado_enquete};
        enquete.create(poll).then(r => {
            res.redirect('/');
        });
    });

});

router.get('/', isLogged, (req,res) => {
    enquete.getAll().then(r => {
        let enquetes = r;
        let user =  req.user;
        for(var i = 0; i< enquetes.length; i++) {
            enquetes[i].respostas = enquetes[i].respostas.split('----');
        }
        console.log(enquetes);
        res.render('enquete', {enquetes: enquetes, user: user});
    });
});

router.get('/:id', isLogged, (req, res) => {
    enquete.getEntireEnqueteById(req.params.id).then(r => {
        let enquete = r[0];
        //res.render('enquete', {enquete: enquete});
        res.json(enquete);
    });
});

module.exports = router;
