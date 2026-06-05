/* TO DO:
    * napravi da se ne prikazuje crveni krug kada je broj proizvoda 0 -> DONE
    * povezivanje sa backendom (drugi ciklus dio)
      ! dva važna segmenta 2. labosa:
      a) dohvat i primanje podataka korištenjem metoda na serverskoj strani
      b) ostvarenje sjednica kako bi se podaci na serverskoj strani mogli vezati uz pojedine korisnike
*/

// prvi put kad se pokrene web stranica moram u local storage postaviti inicijalne vrijednosti broja pojedinih proizvoda
// const cartLSString = localStorage.getItem('cart');  // dohvaćanje cart objekta iz local storagea
// if(cartLSString) {
//   // web stranica je bila prije posjećena, parsiraj i nastavi dalje
//   cartLS = JSON.parse(localStorage.getItem('cart'));
// } else {  // web stranica nije bila prije posjećena, inicijaliziraj cart objekt u local storageu
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// varijable
let cart = [];
let kategorije = [];
let trenutnaKategorija;

// dohvaćanje trenutačnog stanja košarice/carta
//let cart = undefined; // stanje carta na serveru
async function getCart() {
  const url = '/cart/getAll';
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    cart = await response.json();
    console.log(cart);
  } catch (error) {
    console.error(error.message);
  }
}

// dohvaćanje kategorija
//let kategorije = undefined; // result je JS objekt koji sadržava kategorije
async function getCategories() {
  const url = '/home/getCategories';
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    kategorije = await response.json(); // result je JS objekt koji sadržava kategorije
    console.log(kategorije);
  } catch (error) {
    console.error(error.message);
  }
}

// dohvaćanje proizvoda za kategoriju sa specifičnim ID-em
async function getProducts(id) {
  const url = `/home/getProducts/${id}`;
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const proizvodi = await response.json();
    console.log(proizvodi);
    return proizvodi;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

//getCategories();  // dohvaćanje kategorija sa servera
//getCart();        // dohvaćanje trenutačnog stanja košarice sa servera
//let trenutnaKategorija; // globalna varijabla za praćenje trenutne kategorije

// fja mora biti asinkrona jer moramo čekati da se dohvate proizvodi! (funkcija getProducts)
async function promijeniKategoriju(novaKategorija, kliknutiElem) {
  // dohvaćanje elementa pomoću selektora
  let kategorijaHeader = document.querySelector('#gi2 h2');

  // promjena naslova
  kategorijaHeader.innerHTML = novaKategorija;

  // promjena varijable u js
  trenutnaKategorija = novaKategorija;

  let sveKategorije = document.querySelectorAll('#gi4 ul li');
  sveKategorije.forEach((li) => {
    li.classList.remove('active');
  })

  kliknutiElem.classList.add('active');

  // renderiranje proizvoda iz data.js

  // pronalazak podataka
  const odabranaKategorija = kategorije.find(kat => kat.name === novaKategorija);

  // selektiranje kontejnera u koji idu proizvodi
  const container = document.querySelector('.flex-prod-container');
  container.innerHTML = "";  // čišćenje prethodnih proizvoda iz diva

  if(odabranaKategorija) {
    const proizvodiKategorije = await getProducts(odabranaKategorija.id); // OBAVEZAN await!
    proizvodiKategorije.forEach(proizvod => {

      const trenutnaKolicina = cart[proizvod.name] > 0 ? cart[proizvod.name] : 0;
      if(trenutnaKolicina === 0) {
        hiddenAtribut = "hidden";
      } else {
        hiddenAtribut = "";
      }

      const proizvodHTML = `<div class="prod-container">
            <div class="img-container">
            <p class="cart-number" ${hiddenAtribut}>${trenutnaKolicina}</p>
              <img
                src="${proizvod.image}"
                alt="${proizvod.name}"
              />
              <img
                onclick="dodajUKosaricu(this)"
                id="cart-over"
                src="public/images/ikone/cart-shopping-svgrepo-com.svg"
                alt="Košarica preko proizvoda"
              />
            </div>
            <span class="prod-text"
              ><span class="prod-bold">${proizvod.name}</span><br />${novaKategorija}</span
            >
          </div>`;

      container.innerHTML += proizvodHTML;
    })
  } else {
    container.innerHTML = "<p>Nema proizvoda u trenutnoj kategoriji.</p>"
  }

}

function dodajUKosaricu(elementImg) {   // elementImg je img element na koji je kliknuto na stranici
  const kartica = elementImg.closest('.prod-container'); // da dohvatimo najbliži product container
  const proizvod = kartica.querySelector('.prod-bold').innerText;  // ime proizvoda
  const kosarica = document.querySelector('.cartA .cart-number');
  cart[proizvod]++;
  //localStorage.setItem('cart', JSON.stringify(cart)); // objekt cart zapisujemo u JSON formatu u lokalni spremnik browsera
  // želim promijeniti  <p class="cart-number"></p>

  const cartNumber = kartica.querySelector('.cart-number'); // moramo selektirati u kartici jer se .cart-number nalazi u kartici, a ne u elementImg
  cartNumber.innerHTML = cart[proizvod];  // cart[proizvod] je value
  cartNumber.removeAttribute('hidden'); // uklanjanje atributa hidden elementa cartNumber

  // dobivanje ukupnog broja proizvoda
  let ukupno = 0;
  Object.values(cart).forEach(kolicina => {
    ukupno += kolicina;
  })
  // želim promijeniti dodati količinu proizvoda kod ikonice košarice
  if(ukupno > 0) {
    kosarica.innerHTML = ukupno;
  }

}

// // prikaz kod učitavanja stranice -> krećemo od prve kategorije - Crossfit
// const pocetnaKat = document.querySelector('#gi4 ul li:first-child');
// promijeniKategoriju('Crossfit', pocetnaKat);
// const kosarica = document.querySelector('.cartA .cart-number');

// // prikaz broja elemenata u košarici na početku
// // ažuriranje podataka gore na košarici

// // // dobivanje ukupnog broja proizvoda
// let ukupno = 0;
// Object.values(cartLS).forEach(kolicina => {
//   ukupno += kolicina;
// })
// // želim promijeniti dodati količinu proizvoda kod ikonice košarice
// if(ukupno > 0) {
//   kosarica.innerHTML = ukupno;
// }

// pokretačka funkcija
async function pokretackaFja() {
  await Promise.all([getCategories(), getCart()]);

  const pocetnaKat = document.querySelector('#gi4 ul li:first-child');
  promijeniKategoriju('Crossfit', pocetnaKat);
}

pokretackaFja();
