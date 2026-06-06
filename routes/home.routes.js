// ova datoteka sadrži rute za košaricu
// struktura express koda: app.Method(Path, Handler)
// ovo je controller dio MVC modela

const express = require('express'); // uvod express modula
const router = express.Router();
const myData = require('../data/mydata.js');

// home ruta
router.get('/', (req, res) => {
  // rendera ejs template za home
  res.render('home')
})

// dohvaćanje svih kategorija stranice -> vraća JSON array svih kategorija
router.get('/getCategories', (req, res) => {
    const sveKategorije = myData.categories;
    if(sveKategorije) {
      res.json(sveKategorije);
    } else {
      console.log('Neuspješan dohvat kategorija');
      res.status(404);
    }
})

router.get('/getProducts/:id', (req, res) => {
  const categoryId = Number(req.params.id);

  // myData.categories je array objekata
  const foundCategory = myData.categories.find(category => category.id === categoryId);
  if(!foundCategory) {  // kategorija nije pronađena
    return res.status(404).json({error: 'Kategorija nije pronađena.'});
  }

  res.json(foundCategory.products); // vraćamo proizvode tražene kategorije
})

module.exports = router;
