const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.send('Will send all the dishes to You!')
})
.post((req, res) => {
    res.send('Will add the dish ' + req.body.name + 
    ' with details ' + req.body.description);
})
.put((req, res) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /dishes');
})
.delete((req, res) => {
    res.send('Will delete all the dishes !')
});

dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.send('Will send the dish: ' + req.params.dishId + ' to You!')
})
.post((req, res) => {
    res.statusCode = 403;
    res.send('POST operation not supported on /dishes/' + req.params.dishId);
})
.put((req, res) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req, res) => {
    res.send('Deleting dish: ' + req.params.dishId);
});


module.exports = dishRouter;
