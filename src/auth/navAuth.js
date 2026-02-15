import { auth, onAuthStateChanged, signOut } from '../firebaseconfig.js';

const SELECTOR = 'a.auth-link';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_SELECTOR = 'a.admin-link';

const setHidden = (el, value) => {
  el.hidden = value;
};

const applyLoggedOutState = (links) => {
  links.forEach((link) => {
    const textSpan = link.querySelector('.nav-link-text');
    if (textSpan) {
      textSpan.textContent = link.dataset.authLabelLogin || 'Login';
    } else {
      // For sidebar links without span
      const icon = link.querySelector('i');
      if (icon) {
        link.innerHTML = '';
        link.appendChild(icon);
        link.appendChild(document.createTextNode(link.dataset.authLabelLogin || 'Login'));
      } else {
        link.textContent = link.dataset.authLabelLogin || 'Login';
      }
    }
    link.setAttribute('href', 'login.html');
    link.onclick = null;
    setHidden(link, false);
  });
};

const applyAdminLinks = (user) => {
  const adminLinks = Array.from(document.querySelectorAll(ADMIN_SELECTOR));
  console.log('🔍 Debug applyAdminLinks:', { adminLinks: adminLinks.length, user: user?.email });
  
  if (!adminLinks.length) {
    console.log('❌ No admin links found');
    return;
  }

  const isAdmin =
    user && (user.email || '').toLowerCase() === ADMIN_EMAIL;
  console.log('👤 isAdmin check:', { email: user?.email, isAdmin });

  adminLinks.forEach((link, index) => {
    console.log(`🔧 Admin link ${index}:`, { 
      currentHidden: link.hidden, 
      isAdmin, 
      willSetHidden: !isAdmin 
    });
    
    if (isAdmin) {
      link.hidden = false;
      console.log(`✅ Admin link ${index} shown`);
    } else {
      link.hidden = true;
      console.log(`🚫 Admin link ${index} hidden`);
    }
  });
};

const applyLoggedInState = (links) => {
  links.forEach((link) => {
    const textSpan = link.querySelector('.nav-link-text');
    if (textSpan) {
      textSpan.textContent = link.dataset.authLabelLogout || 'Logout';
    } else {
      // For sidebar links without span
      const icon = link.querySelector('i');
      if (icon) {
        link.innerHTML = '';
        link.appendChild(icon);
        link.appendChild(document.createTextNode(link.dataset.authLabelLogout || 'Logout'));
      } else {
        link.textContent = link.dataset.authLabelLogout || 'Logout';
      }
    }
    link.setAttribute('href', '#');
    link.onclick = async (e) => {
      e.preventDefault();
      await signOut(auth);
      window.location.href = 'index.html';
    };
    setHidden(link, false);
  });
};

const setupNavAuth = () => {
  const links = Array.from(document.querySelectorAll(SELECTOR));
  const hasAuthLinks = links.length > 0;
  const hasAdminLinks = document.querySelectorAll(ADMIN_SELECTOR).length > 0;
  
  console.log('🚀 Setup Nav Auth:', { hasAuthLinks, hasAdminLinks });
  
  if (!hasAuthLinks && !hasAdminLinks) return;

  onAuthStateChanged(auth, (user) => {
    console.log('🔄 Auth State Changed:', { 
      user: user?.email, 
      uid: user?.uid,
      hasAuthLinks, 
      hasAdminLinks 
    });
    
    if (!user) {
      console.log('❌ No user - logged out state');
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

    console.log('✅ User logged in - applying states');
    if (hasAuthLinks) applyLoggedInState(links);
    applyAdminLinks(user);
  });
};

setupNavAuth();
