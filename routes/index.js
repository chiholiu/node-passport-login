const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
<<<<<<< HEAD
var Product = require('../models/product');
=======
const Cart = require('../models/Cart');
const Product = require('../models/Product');
>>>>>>> 2a13b503d92e389b8f2dc1d616fe8c318852af11

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name,
}));

router.get('/product', (req, res, next) => {
    Product.find(function (err, docs) {
<<<<<<< HEAD
        var productChunks = [];
        var chunkSize = 3;
        
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('product', {title: 'Shopping Cart', products: docs, image: docs.imagePath});
=======
        res.render('product', {title: 'Shopping Cart', products: docs});
>>>>>>> 2a13b503d92e389b8f2dc1d616fe8c318852af11
    });
});

router.get('/add-to-cart/:id', (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if(err) {
            return res.redirect('/product');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/product');
    })
});

router.get('/shopping-cart', (req, res, next) => {
    if(!req.session.cart) {
        return res.render('/shopping-cart', {products: null});
    }
    let cart = new Cart(req.session.cart);
    console.log('req.session.cart ' + req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', (req, res, next) => {
    if (!req.session.cart) {
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout', {total: cart.totalPrice});  
});

router.post('/delete/:id', (req, res) => {
    Cart.findByIdAndRemove(req.params.id, function(err, doc) {
        if(err) return res.status(500).send(err);
        return res.status(200).send(doc);
    })
});

module.exports = router;