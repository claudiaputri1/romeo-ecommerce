// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
import './src/auth/navAuth.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async () => {
  const featuredCenter = getElement('.featured-center');
  const products = await fetchProducts();
  if (products) {
    // add products to the store
    setupStore(products);
    const featured = store.filter((product) => product.featured === true);
    display(featured, getElement('.featured-center'));
    if (!featured.length) {
      featuredCenter.innerHTML = `<h3 class="filter-error">Belum ada produk unggulan.</h3>`;
    }
  } else {
    featuredCenter.innerHTML = `<h3 class="filter-error">Belum ada produk unggulan.</h3>`;
  }
};

window.addEventListener('DOMContentLoaded', init);
