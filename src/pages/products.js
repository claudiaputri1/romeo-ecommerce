// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// filter imports
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';
import setupSearch from '../filters/search.js';
// specific imports
import { store, setupStore } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';
import fetchProducts from '../fetchProducts.js';

const init = async () => {
  const loading = getElement('.page-loading');
  
  if (store.length < 1) {
    const products = await fetchProducts();
    if (products) {
      setupStore(products);
    }
  }
  
  display(store, getElement('.products-container'));
  setupCompanies(store);
  setupPrice(store);
  setupSearch(store);
  
  loading.style.display = 'none';
};

init();