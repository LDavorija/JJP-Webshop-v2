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
    const sveKategorije = myData.data.categories;
    if(sveKategorije) {
      res.json(sveKategorije);
    } else {
      console.log('Neuspješan dohvat kategorija');
      res.status(404);
    }
})

router.get('/getProducts/:id', (req, res) => {
  const sveKategorije = myData.data.categories;
  let categoryId = req.params.id;  // ID kategorije
  let foundCategory = undefined;
  for(category in sveKategorije) {
    if(category.id === categoryId) {
      foundCategory = category;
      break;
    }
  }

  const proizvodiKategorije = undefined; // svi proizvodi tražene kategorije (kategorija sa zadanim Id)
  if(foundCategory) {
    proizvodiKategorije = foundCategory.products;
    res.json(proizvodiKategorije);
  } else {
    res.status(404);
  }
})

module.exports = router;
