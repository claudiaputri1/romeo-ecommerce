import { getElement, formatPrice } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceInput = getElement('.price-filter');
  const priceValue = getElement('.price-value');

  if (!Array.isArray(store) || store.length === 0) {
    priceInput.value = 0;
    priceInput.max = 0;
    priceInput.min = 0;
    priceValue.textContent = `Nilai: ${formatPrice(0)}`;
    return;
  }

  // setup filter
  let maxPrice = store.map((product) => product.price);
  maxPrice = Math.max(...maxPrice);
  maxPrice = Math.ceil(maxPrice);
  
  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceValue.textContent = `Nilai: ${formatPrice(maxPrice)}`;

  priceInput.addEventListener('input', function () {
    const value = parseInt(priceInput.value);
    priceValue.textContent = `Nilai: ${formatPrice(value)}`;
    let newStore = store.filter((product) => product.price <= value);
    display(newStore, getElement('.products-container'), true);
    
    if (newStore.length < 1) {
      const products = getElement('.products-container');
      products.innerHTML = `<h3 class="filter-error">Maaf, tidak ada produk yang sesuai dengan pencarian Anda</h3>`;
    }
  });
};

export default setupPrice;