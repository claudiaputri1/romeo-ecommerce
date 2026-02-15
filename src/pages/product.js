// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
import '../auth/navAuth.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { getElement, formatPrice } from '../utils.js';
import { findProduct, setupStore, store } from '../store.js';
import fetchProducts from '../fetchProducts.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');

// Safe element selection with fallbacks
const pageTitleDOM = document.querySelector('.page-hero-title');
const imgDOM = document.querySelector('.single-product-img');
const titleDOM = document.querySelector('.single-product-title');
const companyDOM = document.querySelector('.single-product-company');
const priceDOM = document.querySelector('.single-product-price');
const colorsDOM = document.querySelector('.single-product-colors');
const descDOM = document.querySelector('.single-product-desc');
const cartBtn = document.querySelector('.addToCartBtn');

// Check if all required elements exist
if (!pageTitleDOM || !imgDOM || !titleDOM || !companyDOM || !priceDOM || !colorsDOM || !descDOM || !cartBtn) {
  console.error('❌ Missing DOM elements:', {
    pageTitleDOM: !!pageTitleDOM,
    imgDOM: !!imgDOM,
    titleDOM: !!titleDOM,
    companyDOM: !!companyDOM,
    priceDOM: !!priceDOM,
    colorsDOM: !!colorsDOM,
    descDOM: !!descDOM,
    cartBtn: !!cartBtn
  });
  centerDOM.innerHTML = `
    <div>
      <h3 class="error">Maaf, halaman tidak lengkap</h3>
      <a href="index.html" class="btn">kembali ke beranda</a>
    </div>
  `;
  loading.style.display = 'none';
  centerDOM.style.display = 'grid';
}

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  console.log('🚀 Product page loading...');
  
  const urlID = window.location.search;
  console.log('🔍 URL ID:', urlID);

  try {
    const params = new URLSearchParams(urlID);
    productID = params.get('id');
    console.log('🆔 Product ID:', productID);

    // Setup store if empty
    console.log('📦 Store length:', store.length);
    if (store.length < 1) {
      console.log('🔄 Fetching products...');
      const products = await fetchProducts();
      console.log('📥 Products fetched:', products?.length);
      if (Array.isArray(products) && products.length) {
        setupStore(products);
        console.log('✅ Store setup complete');
      }
    }

    console.log('🔍 Finding product:', productID);
    const product = findProduct(productID);
    console.log('📦 Product found:', !!product);

    if (product) {
      console.log('📋 Product data:', product);
      // grab product
      const { id, name, company, price, colors, description, image } = product;
      document.title = `${name || 'Produk'} | ROMEO`;
      pageTitleDOM.textContent = `Beranda / ${name || 'Produk'}`;
      imgDOM.src = image || '';
      titleDOM.textContent = name || 'Produk';
      companyDOM.textContent = `oleh ${company || 'Tidak diketahui'}`;
      priceDOM.textContent = formatPrice(price || 0);
      descDOM.textContent = description || 'Tidak ada deskripsi tersedia.';
      
      // Handle colors safely
      if (colors && Array.isArray(colors)) {
        colors.forEach((color) => {
          const span = document.createElement('span');
          span.classList.add('product-color');
          span.style.backgroundColor = `${color}`;
          colorsDOM.appendChild(span);
        });
      } else {
        console.log('⚠️ No colors available for this product');
      }
      
      // Set button data-id
      cartBtn.dataset.id = id;
      console.log('✅ Product loaded successfully');
    } else {
      console.log('❌ Product not found');
      centerDOM.innerHTML = `
        <div>
          <h3 class="error">Maaf, produk tidak ditemukan</h3>
          <a href="index.html" class="btn">kembali ke beranda</a>
        </div>
      `;
    }
  } catch (error) {
    console.error('💥 Error occurred:', error);
    centerDOM.innerHTML = `
      <div>
        <h3 class="error">Maaf, terjadi kesalahan: ${error.message}</h3>
        <a href="index.html" class="btn">kembali ke beranda</a>
      </div>
    `;
  }

  loading.style.display = 'none';
  centerDOM.style.display = 'grid';
});

cartBtn?.addEventListener('click', function () {
  addToCart(productID);
});