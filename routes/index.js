const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name,
}));

router.get('/product', (req, res, next) => {
    Product.find(function (err, docs) {
        res.render('product', {title: 'Shopping Cart', products: docs});
    });
});

router.get('/add-to-cart/:id', (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    Product.findById(productId, function(err, product) {
        if(err) {
            return res.redirect('/product');
        }
        cart.add(product, product.id, product.imagePath);
        req.session.cart = cart;
        res.redirect('/shopping-cart');
    });
});

router.get('/reduce/:id', (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(window.location.href);
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/add/:id', (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    var windowVar = window.location.pathname;
    console.log(windowVar);


    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', (req, res, next) => {
    if(!req.session.cart) {
        return res.render('shopping-cart', {products: null});
    }
    let cart = new Cart(req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, (req, res, next) => {
    if (!req.session.cart) {
      return res.redirect('/shopping-cart');
    }

    let cart = new Cart(req.session.cart);
    res.render('checkout', {products: cart.generateArray(), total: cart.totalPrice});  
});

module.exports = router;

// check if loggedIn

function isLoggedIn(req, res,next) {
    if(req.isAuthenticated()) {
        console.log(req.url);
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}