// js kod za košaricu

async function ucitajKosaricu() {
  const response = await fetch('/cart/getAll'); // slanje http requesta na url /cart/getAll
  const cart = await response.json(); // u cart konstanti je sada sadržaj košarice kao array
  const container = document.querySelector('.rows');
  const kosarica = document.querySelector('.cartA .cart-number');

  container.innerHTML = ''; // brisanje prethodnog prikaza košarice

  if (cart.length === 0) {  // prazna košarica
    container.innerHTML = '';
    kosarica.innerHTML = '';
    return;
  }

  const ukupno = cart.reduce((sum, item) => sum + item.quantity, 0);  // ukupan broj proizvoda u košarici
  kosarica.innerHTML = ukupno > 0 ? ukupno : '';

  // dodavanje HTML-a
  cart.forEach(item => {
    container.innerHTML += `
      <div class="products-row">
        <span class="prod-name">${item.name}</span>
        <div class="quantity-selector">
          <img onclick="dodajUKosaru(${item.id})" src="/buttons/add-ellipse-svgrepo-com.svg" alt="Add" />
          <span class="amount">${item.quantity}</span>
          <img onclick="uzmiIzKosare(${item.id})" src="/buttons/button-circle-round-remove-svgrepo-com.svg" alt="Remove" />
        </div>
      </div>`;
  });
}

// fja za dodavanje proizvoda u košaricu iz cart dijela web stranice
async function dodajUKosaru(productID) {
  await fetch(`/cart/add/${productID}`);  // slanje http requesta poslužitelju da doda novi proizvod u cart
  ucitajKosaricu(); // prikaz novog sadržaja košarice
}

// fja za uklanjanje proizvoda iz košarice u cart dijelu web stranice
async function uzmiIzKosare(productID) {
  await fetch(`/cart/remove/${productID}`); // slanje http requesta poslužitelju da ukloni proizvod iz carta
  ucitajKosaricu(); // prikaz novog sadržaja košarice
}

ucitajKosaricu(); // inicijalni prikaz košarice prilikom prvog pokretanja web stranice
