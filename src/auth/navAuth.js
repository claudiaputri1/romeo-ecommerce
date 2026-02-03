import { auth, onAuthStateChanged, signOut } from '../firebaseconfig.js';

const SELECTOR = 'a.auth-link';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_SELECTOR = 'a.admin-link';

const setHidden = (el, value) => {
  if (value) el.setAttribute('hidden', '');
  else el.removeAttribute('hidden');
};

const applyLoggedOutState = (links) => {
  links.forEach((link) => {
    link.textContent = link.dataset.authLabelLogin || 'Login';
    link.setAttribute('href', 'login.html');
    link.onclick = null;
    setHidden(link, false);
  });
};

const applyAdminLinks = (user) => {
  const adminLinks = Array.from(document.querySelectorAll(ADMIN_SELECTOR));
  if (!adminLinks.length) return;

  const isAdmin =
    user && (user.email || '').toLowerCase() === ADMIN_EMAIL;

  adminLinks.forEach((link) => {
    if (isAdmin) link.removeAttribute('hidden');
    else link.setAttribute('hidden', '');
  });
};

const applyLoggedInState = (links) => {
  links.forEach((link) => {
    link.textContent = link.dataset.authLabelLogout || 'Logout';
    link.setAttribute('href', '#');
    link.onclick = async (e) => {
      e.preventDefault();
      await signOut(auth);
      window.location.href = 'index.html';
    };
    setHidden(link, false);
  });
};

const applyAdminAuthLinksVisibility = (user, links) => {
  if (!links.length) return;
  const isAdmin = user && (user.email || '').toLowerCase() === ADMIN_EMAIL;
  links.forEach((link) => setHidden(link, isAdmin));
};

const setupNavAuth = () => {
  const links = Array.from(document.querySelectorAll(SELECTOR));
  const hasAuthLinks = links.length > 0;
  const hasAdminLinks = document.querySelectorAll(ADMIN_SELECTOR).length > 0;
  if (!hasAuthLinks && !hasAdminLinks) return;

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (hasAuthLinks) applyLoggedOutState(links);
      applyAdminLinks(null);
      // Clear current user from localStorage
      localStorage.removeItem('currentUser');
      return;
    }

    // Store current user info in localStorage for cart system
    localStorage.setItem('currentUser', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));

    if (hasAuthLinks) applyLoggedInState(links);
    applyAdminLinks(user);
    if (hasAuthLinks) applyAdminAuthLinksVisibility(user, links);
  });
};

setupNavAuth();
