// ova datoteka sadrži rute za košaricu
// struktura express koda: app.Method(Path, Handler)
// router = controller
// drugi argument koji predajemo funkciji res.render jest model iz MVC!

const express = require('express'); // uvod express modula
const router = express.Router();
const myData = require('../data/mydata.js');

function findProductById(id) {
  return myData.categories
    .flatMap(category => category.products) // dobivamo 1 array svih produkata (iz svih kategorija)
    .find(product => product.id === id);  // traži odgovarajući element u arrayu
}

// main cart ruta
router.get('/', (req, res) => {
  res.render('cart');
})

// dodavanje proizvoda u session cart
router.get('/add/:id', (req, res) => {
  const product = findProductById(Number(req.params.id));

  if(!product) {
    return res.status(404).json({error: 'Proizvod nije pronađen'});
  }

  // ako session cart ne postoji inicijaliziraj kao prazan objekt, inače uzmi postojeći cart za taj session
  req.session.cart = req.session.cart || {};
  req.session.cart[product.id] = (req.session.cart[product.id] || 0) + 1; // dodaj proizvod u cart

  res.status(200);
  // ako želim vratiti novi cart u bodyu responsea: res.json(req.session.cart)
});

// brisanje proizvoda iz sesssion carta
router.get('/remove/:id', (req, res) => {
  req.session.cart = req.session.cart || {};

  const id = Number(req.params.id); // id proizvoda
  if(req.session.cart[id]) {
    req.session.cart[id]--;

    if(req.session.cart[id] <= 0) {
      delete req.session.cart[id];
    }
  }

  res.status(200);
})

// dohvaćanje JSON fajla session.cart
router.get('/getAll', (req, res) => {
  req.session.cart = req.session.cart || {};

  const products = myData.categories.flatMap(category => category.products);  // dobijem array svih proizvoda
  const cartProducts = Object.entries(req.session.cart).map(
    ([id, quantity]) => {
      const product = products.find(product => product.id === Number(id));

      return {
        ...product,
        quantity
      };
    }
  );

  res.json(cartProducts);
  // NAP.: kod je proširen jer želimo vraćati informacije o svakom pojedinom proizvodu, a ne samo ID i količinu
})

module.exports = router;
