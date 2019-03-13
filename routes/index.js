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

// router.post('/delete/:id', (req, res) => {
//     Cart.findByIdAndRemove(req.params.id, function(err, doc) {
//         if(err) return res.status(500).send(err);
//         return res.status(200).send(req.params.id);
//     })
// });

module.exports = router;