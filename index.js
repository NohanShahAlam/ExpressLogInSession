var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Test6 - Sessions' });
});

/* GET login */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

/* POST login */
router.post('/login', function(req, res, next) {
    req.session.mail = req.body.mail;
    res.redirect('/panel');
});

/* GET panel */
router.get('/panel', function(req, res, next) {
    if (req.session.mail) {
        res.render('panel', { mail: req.session.mail });
    } else {
        res.send('<h1>Access Denied</h1><p>You do not have access to this page. <a href="/login">Log in first</a></p>');
    }
});

/* GET logout */
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
