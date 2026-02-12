import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';

const display = (products, element, filters = false) => {
  // Check if this is for featured section (homepage) or products page
  const isFeaturedSection = element.classList.contains('featured-center');
  
  // display products
  element.innerHTML = products
    .map((product) => {
      const { 
        id, 
        name, 
        image, 
        price, 
        company, 
        category, 
        description, 
        featured 
      } = product;
      
      if (isFeaturedSection) {
        // Homepage featured products layout
        return `
          <article class="product">
            <div class="product-container">
              <img src="${image}" class="product-img" alt="${name}" />
              <div class="product-icons">
                <a href="product.html?id=${id}" class="product-icon">
                  <i class="fas fa-search"></i>
                </a>
                <button class="product-cart-btn product-icon" data-id="${id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
            <div class="product-footer">
              <h3 class="product-name">${name}</h3>
              <h4 class="product-price">${formatPrice(price)}</h4>
            </div>
          </article>
        `;
      } else {
        // Products page layout
        return `
          <article class="product">
            ${featured ? '<div class="product-badge">Featured</div>' : ''}
            <div class="product-container">
              <img src="${image}" class="product-img" alt="${name}" />
              <div class="product-icons">
                <a href="product.html?id=${id}" class="product-icon">
                  <i class="fas fa-search"></i>
                </a>
                <button class="product-cart-btn product-icon" data-id="${id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
            <div class="product-info">
              <div class="product-header">
                <h3 class="product-name">${name}</h3>
              </div>
              <p class="product-company">${company}</p>
              <p class="product-description">${description}</p>
              <div class="product-footer">
                <h4 class="product-price">${formatPrice(price)}</h4>
              </div>
              <button class="btn-add-cart" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
                Tambah ke Keranjang
              </button>
            </div>
          </article>
        `;
      }
    })
    .join('');

  if (filters) return;

  element.addEventListener('click', function (e) {
    const parent = e.target.parentElement;
    if (parent.classList.contains('product-cart-btn') || e.target.classList.contains('btn-add-cart')) {
      const productId = parent.dataset.id || e.target.dataset.id;
      if (productId) {
        addToCart(productId);
      }
    }
  });
};

export default display;
