var express = require('express');
var router = express.Router();
import R from 'ramda';
var estado_enquete = require('../db/estado_enquete.js');
var pergunta =  require('../db/pergunta.js');
var resposta = require('../db/resposta.js');
var enquete =  require('../db/enquete.js');


router.get('/create', (req, res) => {
    estado_enquete.getAll().then(r => {
        let estado = r;
        console.log(r);
        res.render('create_enquete', {estado_enquete : estado});
    });
});

router.post('/create', (req, res) => {
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
            console.log(r);
            res.redirect('/users');
        });
    });

});

module.exports = router;
