import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addCartItem(product);
  } else {
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }

  displayCartItemCount();
  displayCartTotal();
  setStorageItem('cart', cart);
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addCartItem(cartItem);
  });
}

function addCartItem(cartItem) {
  const { id, name, price, image, amount } = cartItem;
  const article = document.createElement('article');
  article.classList.add('cart-item');
  article.setAttribute('data-id', id);
  article.innerHTML = `
  <img src="${image}" class="cart-item-img" alt="${name}" />
  <div>
    <h4 class="cart-item-name">${name}</h4>
    <p class="cart-item-price">${formatPrice(price)}</p>
    <button class="cart-item-remove-btn" data-id="${id}">hapus</button>
  </div>
  <div>
    <button class="cart-item-increase-btn" data-id="${id}">
      <i class="fas fa-chevron-up"></i>
    </button>
    <p class="cart-item-amount" data-id="${id}">${amount}</p>
    <button class="cart-item-decrease-btn" data-id="${id}">
      <i class="fas fa-chevron-down"></i>
    </button>
  </div>
  `;
  cartItemsDOM.appendChild(article);
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      element.parentElement.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

// remove item
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

const init = () => {
  displayCartItemCount();
  displayCartTotal();
  displayCartItemsDOM();
  setupCartFunctionality();
};

init();