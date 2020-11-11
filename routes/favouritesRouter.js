const express = require('express');
const bodyParser = require('body-parser');
const Favourite = require('../models/favourites');
const authenticate = require('../authenticate');
const favouriteRouter = express.Router();
const cors = require('./cors');
favouriteRouter.use(bodyParser.json());

favouriteRouter.get('/', cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.find({})
        .populate('user')
        .populate('dishes')
        .then((favourite) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favourite);
        })
        .catch((err) => next(err));
})

favouriteRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    var fav = new Favourite({user: req.user._id})
    req.body.forEach(element => {
        fav.dishes.push(element)
    });
    fav.save()
    .then((favourite) => {
        console.log('favourite is ' + favourite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favourite);
    })
    .catch((err) => next(err));
})

favouriteRouter.post('/:dishId', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    console.log(req.params.dishId)
    var fav = new Favourite({user: req.user._id})
    fav.dishes.push(req.params.dishId);
    fav.save()
        .then((favourite) => {
            console.log('favourite is ' + favourite);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favourite);
        })
        .catch((err) => next(err));
})



favouriteRouter.put('/', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /promotions');
})
favouriteRouter.delete('/:dishId', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        var fav = new Favourite({user: req.user._id})
        var index = fav.dishes.indexOf(req.params.dishId);
        fav.dishes.splice(index, 1);
        fav.save()
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
});


favouriteRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    Favourite.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
});

module.exports = favouriteRouter;


