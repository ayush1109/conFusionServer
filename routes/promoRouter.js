const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.send('Will send all the promotions to You!')
})
.post((req, res) => {
    res.send('Will add the promotion ' + req.body.name + 
    ' with details ' + req.body.description);
})
.put((req, res) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.send('Will delete all the promotions !')
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.send('Will send the promotion: ' + req.params.promoId + ' to You!')
})
.post((req, res) => {
    res.statusCode = 403;
    res.send('POST operation not supported on /promotions/' + req.params.promoId);
})
.put((req, res) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req, res) => {
    res.send('Deleting promotion: ' + req.params.promoId);
});


module.exports = promoRouter;
