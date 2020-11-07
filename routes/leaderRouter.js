const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const Leaders = require('../models/leaders');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(cors.cors, (req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log('leader is ' + leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.send('PUT operation not supported on /leaders');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => next(err));
    });

leaderRouter.route('/:leaderId')
    .get(cors.cors, (req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                console.log('leader is ' + leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.send('POST operation not supported on /leader/' + req.params.leaderId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
        Dishes.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => next(err));
    });


module.exports = leaderRouter;
