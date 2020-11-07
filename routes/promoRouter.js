const express = require('express');
const bodyParser = require('body-parser');
const Promos = require('../models/promotions');
const authenticate = require('../authenticate');
const promoRouter = express.Router();
const cors = require('./cors');
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(cors.cors, (req, res, next) => {
        Promos.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        Promos.create(req.body)
            .then((promo) => {
                console.log('promo is ' + promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            })
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.send('PUT operation not supported on /promotions');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        Promos.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => next(err));
    });

promoRouter.route('/:promoId')
    .get(cors.cors, (req, res, next) => {
        Promos.findById(req.params.promoId)
            .then((promo) => {
                console.log('promo is ' + promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.send('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
        Promos.findByIdAndUpdate(req.params.promoId, {
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
        Promos.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => next(err));
    });


module.exports = promoRouter;
