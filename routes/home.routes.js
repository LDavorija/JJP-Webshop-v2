// ova datoteka sadrži rute za home
// struktura express koda: app.Method(Path, Handler)
// ovdje se povezuju controller i model dio MVC-a

const express = require('express'); // uvod express modula
const router = express.Router();  // router = controller
const myData = require('../data/mydata.js');  // "baza podataka"

// home ruta -> jedina home ruta za prikaz, a ne dohvat sadržajaks
router.get('/', (req, res) => {
  // rendera ejs template za home
  res.render('home')
})

// dohvaćanje svih kategorija stranice -> vraća JSON array svih kategorija
router.get('/getCategories', (req, res) => {
    const sveKategorije = myData.categories;  // myData.categories je array objekata kategorija
    if(sveKategorije) { // uspješno dohvaćene sve kategorije
      res.json(sveKategorije);
    } else {  // neuspješan dohvat kategorija
      console.log('Neuspješan dohvat kategorija');
      res.sendStatus(404);
    }
})

// dohvaćanje proizvoda za kategoriju specifičnog ID-a, vraća array proizvoda određene kategorije
router.get('/getProducts/:id', (req, res) => {
  const categoryId = Number(req.params.id);

  // myData.categories je array objekata
  const foundCategory = myData.categories.find(category => category.id === categoryId);
  if(!foundCategory) {  // kategorija nije pronađena
    return res.sendStatus(404);
  }

  res.json(foundCategory.products); // vraćamo proizvode tražene kategorije
})

module.exports = router;  // exportamo modul da bismo ga mogli koristiti u server.js, tj. mapirati ovaj ruter na /home putanju
