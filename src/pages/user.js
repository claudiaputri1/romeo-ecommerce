import { auth, signOut, onAuthStateChanged } from '../firebaseconfig.js';

const ADMIN_EMAIL = 'admin@gmail.com';

const $ = (id) => document.getElementById(id);

const userInfo = $('userInfo');
const userHint = $('userHint');
const logoutBtn = $('logoutBtn');

const setHint = (msg) => {
  userHint.textContent = msg || '';
};

logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'login.html';
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const email = (user.email || '').toLowerCase();
  if (email === ADMIN_EMAIL) {
    window.location.href = 'admin.html';
    return;
  }

  userInfo.textContent = `Login sebagai: ${user.email || 'user'}`;
  setHint('');
});
