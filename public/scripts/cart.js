async function ucitajKosaricu() {
  const response = await fetch('/cart/getAll');
  const cart = await response.json();
  const container = document.querySelector('.rows');
  const kosarica = document.querySelector('.cartA .cart-number');

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Kosarica je prazna.</p>';
    kosarica.innerHTML = '';
    return;
  }

  const ukupno = cart.reduce((sum, item) => sum + item.quantity, 0);
  kosarica.innerHTML = ukupno > 0 ? ukupno : '';

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

async function dodajUKosaru(productID) {
  await fetch(`/cart/add/${productID}`);
  ucitajKosaricu();
}

async function uzmiIzKosare(productID) {
  await fetch(`/cart/remove/${productID}`);
  ucitajKosaricu();
}

ucitajKosaricu();
