// ova datoteka sadrži rute za košaricu
// struktura express koda: app.Method(Path, Handler)
// router = controller
// drugi argument koji predajemo funkciji res.render jest model iz MVC!

const express = require('express'); // uvod express modula
const router = express.Router();
const myData = require('../data/mydata.js');

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
  const dobiveniID = parseInt(req.params.id);
  let dodaniProizvod = undefined;
  for(const category of myData.categories) {
    for(const product of category.products) {
      if(product.id === dobiveniID) {
        dodaniProizvod = product;
        break;
      }
    }
    if(dodaniProizvod) {
      break;
    }
  }

  // dodavanje proizvoda u cart
  if(dodaniProizvod) {
    if(req.session.cart[dobiveniID]) {  // proizvod već postoji u košarici
      req.session.cart[dobiveniID].quantity += 1;
    } else {  // proizvod ne postoji u košarici, stvoir objekt
      req.session.cart[dobiveniID] = {product: dodaniProizvod, quantity: 1};
    }
    res.status(200);
  } else {
    res.status(404);
  }
});

// brisanje proizvoda iz sesssion carta
router.get('/remove/:id', (req, res) => {
  if(!req.session.cart) {
    req.session.cart = {};
  }

  const dobiveniID = parseInt(req.params.id); // ID proizvoda kojeg treba izbaciti iz carta
  if(req.session.cart[dobiveniID]) {
    if(req.session.cart[dobiveniID].quantity > 1) { // ako imamo više od 1 proizvoda u cartu, smanji za 1
      req.session.cart[dobiveniID].quantity -= 1;
    } else {
      delete req.session.cart[dobiveniID];  // brisanje proizvoda iz košarice jer je količina nakon brisanja 0
    }
    res.status(200);
  } else {
    res.status(404);
  }

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
