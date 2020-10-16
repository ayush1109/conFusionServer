const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.send('Will send all the leaders to You!')
})
.post((req, res) => {
    res.send('Will add the leader ' + req.body.name + 
    ' with details ' + req.body.description);
})
.put((req, res) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /leaders');
})
.delete((req, res) => {
    res.send('Will delete all the leaders !')
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.send('Will send the leader: ' + req.params.leaderId + ' to You!')
})
.post((req, res) => {
    res.statusCode = 403;
    res.send('POST operation not supported on /leaders/' + req.params.leaderId);
})
.put((req, res) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req, res) => {
    res.send('Deleting leader: ' + req.params.leaderId);
});


module.exports = leaderRouter;
