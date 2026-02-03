// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { getElement, formatPrice } from '../utils.js';
import { findProduct } from '../store.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  const urlID = window.location.search;

  try {
    const params = new URLSearchParams(urlID);
    productID = params.get('id');

    const product = findProduct(productID);

    if (product) {
      // grab product
      const { id, name, company, price, colors, description, image } = product;
      document.title = `${name.toUpperCase()} | ROMEO`;
      pageTitleDOM.textContent = `Beranda / ${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `oleh ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });
    } else {
      centerDOM.innerHTML = `
        <div>
          <h3 class="error">Maaf, produk tidak ditemukan</h3>
          <a href="index.html" class="btn">kembali ke beranda</a>
        </div>
      `;
    }
  } catch (error) {
    console.log(error);
    centerDOM.innerHTML = `
      <div>
        <h3 class="error">Maaf, terjadi kesalahan</h3>
        <a href="index.html" class="btn">kembali ke beranda</a>
      </div>
    `;
  }

  loading.style.display = 'none';
  centerDOM.style.display = 'grid';
});

cartBtn.addEventListener('click', function () {
  addToCart(productID);
});