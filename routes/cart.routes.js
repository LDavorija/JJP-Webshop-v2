const express = require('express');
const router = express.Router();
const myData = require('../data/mydata.js');

function findProductById(id) {
  return myData.categories
    .flatMap(category => category.products)
    .find(product => product.id === id);
}

function getCartProducts(cart) {
  return Object.entries(cart)
    .map(([id, quantity]) => {
      const product = findProductById(Number(id));

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity
      };
    })
    .filter(Boolean);
}

router.get('/', (req, res) => {
  res.render('cart');
});

router.get('/add/:id', (req, res) => {
  const product = findProductById(Number(req.params.id));

  if (!product) {
    return res.status(404).json({ error: 'Proizvod nije pronadjen.' });
  }

  req.session.cart = req.session.cart || {};
  req.session.cart[product.id] = (req.session.cart[product.id] || 0) + 1;

  res.json(getCartProducts(req.session.cart));
});

router.get('/remove/:id', (req, res) => {
  req.session.cart = req.session.cart || {};

  const id = Number(req.params.id);
  if (req.session.cart[id]) {
    req.session.cart[id]--;

    if (req.session.cart[id] <= 0) {
      delete req.session.cart[id];
    }
  }

  res.json(getCartProducts(req.session.cart));
});

router.get('/getAll', (req, res) => {
  req.session.cart = req.session.cart || {};
  res.json(getCartProducts(req.session.cart));
});

module.exports = router;
