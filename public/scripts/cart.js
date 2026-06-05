// učitavanje podataka iz lokalnog spremnika u košaricu
const cartLS2 = JSON.parse(localStorage.getItem('cart'));  // parsiramo datoteku u JSON formatu u objekt cart
const container = document.querySelector('.rows');

container.innerHTML = ""; // brisanje prethodne košarice

// učitati proizvode
Object.entries(cartLS2).forEach(([proizvod, kolicina]) => {
  const kosarica = document.querySelector('.cartA .cart-number');
  let ukupno = 0;
  Object.values(cartLS2).forEach(kolicina => {
    ukupno += kolicina;
  })
  // želim promijeniti dodati količinu proizvoda kod ikonice košarice
  if(ukupno > 0) {
     kosarica.innerHTML = ukupno;
  }


  if(kolicina > 0) {
    const proizvodRow = `<div class="products-row">
                <span class="prod-name">${proizvod}</span>
                <div class="quantity-selector">
                  <img
                    onclick="dodajUKosaru(this)"
                    src="public/buttons/add-ellipse-svgrepo-com.svg"
                    alt="Add"
                  />
                  <span class="amount">${kolicina}</span>
                  <img
                    onclick="uzmiIzKosare(this)"
                    src="public/buttons/button-circle-round-remove-svgrepo-com.svg"
                    alt="Remove"
                  />
                </div>
              </div>`

    container.innerHTML += proizvodRow;
  }
})

function dodajUKosaru(element) {
  let row = element.closest('.products-row');
  let productName = row.querySelector('.prod-name').innerHTML;  // ime proizvoda
  cartLS2[productName]++;
  localStorage.setItem('cart', JSON.stringify(cartLS2)); // objekt cart zapisujemo u JSON formatu u lokalni spremnik browsera
  let quantityText = row.querySelector('.amount');
  quantityText.innerHTML = cartLS2[productName];

  // ažuriranje podataka gore na košarici
  const kosarica = document.querySelector('.cartA .cart-number');
  let ukupno = 0;
  Object.values(cartLS2).forEach(kolicina => {
    ukupno += kolicina;
  })
  // želim promijeniti dodati količinu proizvoda kod ikonice košarice
  kosarica.innerHTML = ukupno;
}

function uzmiIzKosare(element) {
  let row = element.closest('.products-row');
  let productName = row.querySelector('.prod-name').innerHTML;  // ime proizvoda
  const kosarica = document.querySelector('.cartA .cart-number');

  cartLS2[productName] > 0 ? cartLS2[productName]-- : 0;
  localStorage.setItem('cart', JSON.stringify(cartLS2)); // objekt cart zapisujemo u JSON formatu u lokalni spremnik browsera
  if(cartLS2[productName] == 0) {
    // ukloniti taj konkretan product row
    row.remove();
    let ukupno = 0;
    Object.values(cartLS2).forEach(kolicina => {
      ukupno += kolicina;
    })
    if(ukupno == 0) {
      kosarica.remove();
    }
  }

  let quantityText = row.querySelector('.amount');
  quantityText.innerHTML = cartLS2[productName];

  // ažuriranje podataka gore na košarici
  let ukupno = 0;
  Object.values(cartLS2).forEach(kolicina => {
    ukupno += kolicina;
  })
  // želim dodati količinu proizvoda kod ikonice košarice
  kosarica.innerHTML = ukupno;
}
