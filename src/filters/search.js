import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
  const form = getElement('.search-form');
  const searchInput = getElement('.search-input');
  
  form.addEventListener('keyup', function (e) {
    e.preventDefault();
    const value = searchInput.value.toLowerCase();
    
    if (value) {
      const newStore = store.filter((product) => {
        let { name, company, category, description } = product;
        name = name.toLowerCase();
        company = company.toLowerCase();
        category = category.toLowerCase();
        description = description.toLowerCase();
        
        return name.includes(value) || 
               company.includes(value) || 
               category.includes(value) || 
               description.includes(value);
      });
      
      display(newStore, getElement('.products-container'), true);
      
      if (newStore.length < 1) {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">Maaf, tidak ada produk "${value}" yang ditemukan</h3>`;
      }
    } else {
      display(store, getElement('.products-container'), true);
    }
  });
};

export default setupSearch;