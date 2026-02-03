import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '../firebaseconfig.js';

const ADMIN_EMAIL = 'admin@gmail.com';

const $ = (id) => document.getElementById(id);

const loginForm = $('loginForm');
const emailInput = $('email');
const passwordInput = $('password');
const registerBtn = $('registerBtn');
const loginHint = $('loginHint');

const setHint = (msg) => {
  loginHint.textContent = msg || '';
};

const redirectByRole = (user) => {
  if (!user) return;

  const email = (user.email || '').toLowerCase();
  if (email === ADMIN_EMAIL) {
    window.location.href = 'admin.html';
    return;
  }

  window.location.href = 'index.html';
};

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  setHint('');

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    setHint('Login gagal. Pastikan email/password benar.');
  }
});

registerBtn.addEventListener('click', async () => {
  setHint('');

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      setHint('Isi email dan password untuk daftar.');
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password);
    setHint('Akun berhasil dibuat. Mengalihkan...');
  } catch (err) {
    console.log(err);
    setHint('Gagal daftar. Coba password minimal 6 karakter atau email sudah terdaftar.');
  }
});

onAuthStateChanged(auth, (user) => {
  if (!user) return;
  redirectByRole(user);
});
