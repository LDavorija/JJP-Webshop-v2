// ova datoteka sadrži rute za košaricu
// struktura express koda: app.Method(Path, Handler)
// router = controller
// drugi argument koji predajemo funkciji res.render jest model iz MVC!

const express = require('express'); // uvod express modula
const router = express.Router();

// main cart ruta
router.get('/', (req, res) => {
  res.render('cart');
})

// dodavanje proizvoda u session cart
router.get('/add/:id', (req, res) => {
  if(!req.session.cart) {
    req.session.cart = {};
  }

  // pronalazak predmeta sa traženim IDem
  const dobiveniID = req.params.id;
  const kategorijaTrazenja = dobiveniID / 10; // ID kategorije u kojoj se nalazi proizvod koji dodajemo u cart
  let dodaniProizvod = undefined;
  for(product in kategorijaTrazenja.products) {
    if(product.id === dobiveniID) {
      dodaniProizvod = product;
    }
  }

  // dodavanje proizvoda u cart
  if(dodaniProizvod) {
    req.session.cart.push(dodaniProizvod);
    res.status(200);
  } else {
    res.status(404);
  }
})

// brisanje proizvoda iz sesssion carta
router.get('/remove/:id', (req, res) => {
  if(!req.session.cart) {
    req.session.cart = {};
  }

  // filtriramo array objekata (proizvoda) na način da u košarici ostavljamo samo one proizvode čiji je ID različit od
  // ID-a izbačenog proizvoda
  req.session.cart = req.session.cart.filter(product => product.id !== dobiveniProizvod.id);

  res.status(200);
})

// dohvaćanje JSON fajla session.cart
router.get('/getAll', (req, res) => {
  if(!req.session.cart) {
    req.session.cart = {};
  }

  res.json(req.session.cart);
})

module.exports = router;
