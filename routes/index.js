const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var Product = require('../models/Product');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name
}));

router.get('/product', function (req, res, next) {
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('product', {title: 'Shopping Cart', products: productChunks});
    });
});

module.exports = router;