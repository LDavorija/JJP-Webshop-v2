// ova datoteka sadrži rute za košaricu/cart

const express = require('express');
const router = express.Router();
const myData = require('../data/mydata.js');

// fja za pronalazak proizvoda po specifičnom ID-u
function findProductById(id) {
  return myData.categories
    .flatMap(category => category.products) // flatMap -> primjena callback fje na svaki element arraya
    .find(product => product.id === id);
}

// array koji sadržava trenutni sadržaj košarice -> ovo će se vraćati klijentu
function getCartProducts(cart) {
  return Object.entries(cart) // Object.entries(objekt) vraća array sa parovima key:value navedenog objekta
    .map(([id, quantity]) => {  // .map služi za primjenu neke funkcije na svakom elementu arraya
      const product = findProductById(Number(id));

      if (!product) { // proizvod ne postoji
        return null;
      }

      return {
        ...product, // svojstva proizvoda - name, image, id
        quantity
      };
    })
    .filter(Boolean); // uklanja null-ove
}

// main cart ruta -> dohvaća "izgled" web stranice
router.get('/', (req, res) => {
  res.render('cart');
});

// ruta za dodavanje proizvoda u cart
router.get('/add/:id', (req, res) => {
  const product = findProductById(Number(req.params.id));

  if (!product) {
    return res.sendStatus(404);
  }

  req.session.cart = req.session.cart || {};
  req.session.cart[product.id] = (req.session.cart[product.id] || 0) + 1;

  res.json(getCartProducts(req.session.cart));  // ovo se vraća klijentu kada on pozove fetch nad urlom /cart/add/:id
});

// ruta za uklanjanje 1 komada proizvoda iz carta sa ID-em id
router.get('/remove/:id', (req, res) => {
  req.session.cart = req.session.cart || {};

  const id = Number(req.params.id);
  if (req.session.cart[id]) { // ako je proizvod sadržan u košarici, smanji količinu za 1
    req.session.cart[id]--;

    if (req.session.cart[id] <= 0) {  // ako je nakon smanjivanja količina pala na 0 ili ispod, obriši proizvod iz košarice
      delete req.session.cart[id];
    }
  }

  res.json(getCartProducts(req.session.cart));  // vraćanje košarice klijentu
});

// ruta za dohvaćanje svih proizvoda trenutno aktivne sjednice
router.get('/getAll', (req, res) => {
  req.session.cart = req.session.cart || {};
  res.json(getCartProducts(req.session.cart));
});

module.exports = router;
