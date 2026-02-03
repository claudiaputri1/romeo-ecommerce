// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
import '../auth/navAuth.js';
// filter imports
import setupCompanies from '../filters/companies.js';
import setupSearch from '../filters/search.js';
// specific imports
import { store, setupStore } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';
import fetchProducts from '../fetchProducts.js';

const init = async () => {
  const loading = getElement('.page-loading');
  const productsContainer = getElement('.products-container');

  try {
    if (store.length < 1) {
      const products = await fetchProducts();
      if (Array.isArray(products) && products.length) {
        setupStore(products);
      } else {
        productsContainer.innerHTML = `<h3 class="filter-error">Belum ada produk.</h3>`;
        return;
      }
    }

    display(store, productsContainer);
    setupCompanies(store);
    setupSearch(store);
  } catch (error) {
    console.log(error);
    productsContainer.innerHTML = `<h3 class="filter-error">Maaf, gagal memuat produk. Cek Firestore Rules / koneksi.</h3>`;
  } finally {
    loading.style.display = 'none';
  }
};

init();