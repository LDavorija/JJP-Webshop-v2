// glavna serverska datoteka

// moduli
const path = require('path');
const express = require('express');
const expressSession = require('express-session');  // za stvaranje sjednica
const ejs = require('ejs');

const app = express();  // express aplikacija

// za parsiranje request bodyja -> koriste se kod PUT i POST requestova jer tu request ima sadržaj u bodyju
app.use(express.urlencoded({extended: false})); // -> server prepoznaje poslani objekt od klijenta kao string/array i pretvara u JS objekt
app.use(express.json()); // -> server prepoznaje poslani objekt od klijenta kao JSON objekt i pretvara u JS objekt
// ako podatke prenosimo preko urla, koristi se urlencoded, a ako podatke prenosimo preko obrasca (skrivena polja), onda
// koristimo json

// postavljanje views (view komponenta MVC) i view engine
app.set('views', path.join(__dirname, 'views'));  // setting, value
app.set('view engine', 'ejs');

// definiranje sjednice -> sjednice moraju biti prije rutera?
app.use(expressSession({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// ruteri
const homeRouter = require('./routes/home.routes.js');
const cartRouter = require('./routes/cart.routes.js');

// korištenje statičkog sadržaja
app.use(express.static(path.join(__dirname, 'public')));
// sve iz public poslužujemo kao statički sadržaj -> JS skripte, CSS, fotografije, font, .svg datoteke...

// mapiranje ruta na rutere
app.use('/home', homeRouter);
app.use('/cart', cartRouter);

// redirect sa korijena na /home
app.get('/', (req, res) => {
  res.redirect('/home');
})

// port(vrata) servera(poslužitelja) jest 3000
app.listen(3000, () => {
  console.log('Server radi na portu 3000.');
});
