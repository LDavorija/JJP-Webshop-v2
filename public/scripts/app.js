// js kod za glavnu stranicu webshopa

/* TO DO:
    * napravi da se ne prikazuje crveni krug kada je broj proizvoda 0 -> DONE
    * povezivanje sa backendom (drugi ciklus dio)
      ! dva važna segmenta 2. labosa:
      a) dohvat i primanje podataka korištenjem metoda na serverskoj strani
      b) ostvarenje sjednica kako bi se podaci na serverskoj strani mogli vezati uz pojedine korisnike
*/

// varijable
let cart = [];  // array za dohvaćanja trenutnog sadržaja košarice sa servera
let kategorije = [];  // array
let trenutnaKategorija; // trenutno aktivna kategorija

// fja za pronalazak proizvoda sa ID-em productId u košarici
function getCartItem(productId) {
  return cart.find(item => item.id === Number(productId));
}

// fja za dobivanje količine proizvoda sa ID-em productId
function getCartQuantity(productId) {
  const cartItem = getCartItem(productId);
  return cartItem ? cartItem.quantity : 0;
}

// cart badge se odnosi na brojač kod košarice gore desno
function updateCartBadge() {
  const kosarica = document.querySelector('.cartA .cart-number');
  const ukupno = cart.reduce((sum, item) => sum + item.quantity, 0);
  kosarica.innerHTML = ukupno > 0 ? ukupno : '';
}

// za svaki proizvod navedeno: ime proizvoda, putanja do fotografije proizvoda, id proizvoda, količina proizvoda u košarici
//let cart = undefined; // stanje carta na serveru
async function getCart() {
  const response = await fetch('/cart/getAll');
  cart = await response.json();
}

// dohvaćanje kategorija
//let kategorije = undefined; // result je JS objekt koji sadržava kategorije
async function getCategories() {
  const response = await fetch('/home/getCategories');
  kategorije = await response.json();
}

// dohvaćanje proizvoda za kategoriju sa specifičnim ID-em
async function getProducts(id) {
  const response = await fetch(`/home/getProducts/${id}`);
  return await response.json();
}

// fja mora biti asinkrona jer moramo čekati da se dohvate proizvodi! (funkcija getProducts)
async function promijeniKategoriju(novaKategorija, kliknutiElem) {
  const kategorijaHeader = document.querySelector('#gi2 h2');
  const container = document.querySelector('.flex-prod-container');
  const odabranaKategorija = kategorije.find(kat => kat.name === novaKategorija);

  kategorijaHeader.innerHTML = novaKategorija;
  trenutnaKategorija = novaKategorija;

  document.querySelectorAll('#gi4 ul li').forEach(li => {
    li.classList.remove('active');
  });
  kliknutiElem.classList.add('active');

  container.innerHTML = '';

  if (!odabranaKategorija) {
    container.innerHTML = '<p>Nema proizvoda u trenutnoj kategoriji.</p>';
    return;
  }

  const proizvodiKategorije = await getProducts(odabranaKategorija.id);

  proizvodiKategorije.forEach(proizvod => {
    const trenutnaKolicina = getCartQuantity(proizvod.id);
    const hiddenAtribut = trenutnaKolicina === 0 ? 'hidden' : '';
    const putanjaSlike = proizvod.image.replace('public', '');

    const proizvodHTML = `<div class="prod-container">
      <div class="img-container">
        <p class="cart-number" ${hiddenAtribut}>${trenutnaKolicina}</p>
        <img src="${putanjaSlike}" alt="${proizvod.name}" />
        <img
          onclick="dodajUKosaricu(this)"
          data-id="${proizvod.id}"
          class="cart-over"
          src="/images/ikone/cart-shopping-svgrepo-com.svg"
          alt="Kosarica preko proizvoda"
        />
      </div>
      <span class="prod-text">
        <span class="prod-bold">${proizvod.name}</span><br />${novaKategorija}
      </span>
    </div>`;

    container.innerHTML += proizvodHTML;
  });
}

async function dodajUKosaricu(elementImg) { // elementImg je img element na koji je kliknuto na stranici
  const kartica = elementImg.closest('.prod-container');  // da dohvatimo najbliži product container
  const productId = elementImg.dataset.id;  // id proizvoda koji želimo dodati u košaricu

  const response = await fetch(`/cart/add/${productId}`);
  cart = await response.json();

  const kolicina = getCartQuantity(productId);
  const cartNumber = kartica.querySelector('.cart-number');

  cartNumber.innerHTML = kolicina;
  cartNumber.removeAttribute('hidden');

  updateCartBadge();
}

// fja koja osvježava stranicu nakon povratka iz košarice
async function osvjeziNakonPovratka() {
  if (!trenutnaKategorija) {
    return;
  }

  const aktivnaKategorija = document.querySelector('#gi4 ul li.active');

  await getCart();  // dohvat podataka za košaricu koja pripada trenutnoj sjednici
  updateCartBadge();  // ažuriranje cart badgea gore desno

  if (aktivnaKategorija) {
    await promijeniKategoriju(trenutnaKategorija, aktivnaKategorija); // drugi dio osvježavanja stranice nakon povratka
  }
}

// fja koja se pozove prilikom prvog pokretanja web stranice
async function pokretackaFja() {
  await Promise.all([getCategories(), getCart()]);  // dohvat kategorija i košarice

  updateCartBadge();

  const pocetnaKat = document.querySelector('#gi4 ul li:first-child');
  await promijeniKategoriju('Crossfit', pocetnaKat);  // prva kategorija koja se prikazuje je Crossfit
}

pokretackaFja();  // poziv fje prilikom prvog učitavanja web stranice

// event listener koji se pokreće kada se vratimo iz košarice
window.addEventListener('pageshow', osvjeziNakonPovratka);  // pageshow event -> when the page is shown to the user
