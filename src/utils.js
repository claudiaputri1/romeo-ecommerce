// Format harga ke Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(`Please check "${selection}" selector, no such element exists`);
};

const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

// User-specific storage functions
const getUserStorageKey = (baseKey) => {
  // Try to get current user from localStorage (set by auth system)
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const userKey = `${baseKey}_${user.uid}`;
    console.log('Using user-specific key:', userKey, 'for user:', user.email);
    return userKey;
  }
  // Fallback to base key if no user
  console.log('Using fallback key:', baseKey);
  return baseKey;
};

const getUserStorageItem = (item) => {
  const userKey = getUserStorageKey(item);
  let storageItem = localStorage.getItem(userKey);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(userKey));
  } else {
    storageItem = [];
  }
  return storageItem;
};

const setUserStorageItem = (name, item) => {
  const userKey = getUserStorageKey(name);
  localStorage.setItem(userKey, JSON.stringify(item));
};

const singleProductUrl = 'product.html';

export {
  formatPrice,
  getElement,
  getStorageItem,
  setStorageItem,
  getUserStorageItem,
  setUserStorageItem,
  singleProductUrl
};