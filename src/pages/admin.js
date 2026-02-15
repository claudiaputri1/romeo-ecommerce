import {
  auth,
  db,
  signOut,
  onAuthStateChanged,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from '../firebaseconfig.js';

const ADMIN_EMAIL = 'admin@gmail.com';

const $ = (id) => document.getElementById(id);

const adminUserEl = $('adminUser');
const adminLogoutBtn = $('adminLogoutBtn');

const adminPanel = $('adminPanel');

const productFormTitle = $('productFormTitle');
const productFormResetBtn = $('productFormResetBtn');
const productForm = $('productForm');
const productFormHint = $('productFormHint');
const productSubmitBtn = $('productSubmitBtn');

const productId = $('productId');
const nameInput = $('name');
const companyInput = $('company');
const categoryInput = $('category');
const priceInput = $('price');
const imageInput = $('image');
const descriptionInput = $('description');
const shippingInput = $('shipping');
const featuredInput = $('featured');

const refreshProductsBtn = $('refreshProductsBtn');
const productsTbody = $('productsTbody');
const productsHint = $('productsHint');

// Image upload elements
const imageFile = $('imageFile');
const imageUploadArea = $('imageUploadArea');
const imagePreview = $('imagePreview');
const previewImg = $('previewImg');
const removeImage = $('removeImage');

const setHint = (el, msg) => {
  el.textContent = msg || '';
};

// Image upload functions
const handleImageUpload = (file) => {
  if (!file) return;

  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    setHint(productFormHint, 'Ukuran gambar maksimal 5MB.');
    return;
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    setHint(productFormHint, 'File harus berupa gambar.');
    return;
  }

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    imagePreview.classList.add('active');
    document.querySelector('.upload-placeholder').classList.add('hidden');
    
    // Update image input with base64 data
    imageInput.value = e.target.result;
    setHint(productFormHint, '');
  };
  reader.readAsDataURL(file);
};

const removeImagePreview = () => {
  previewImg.src = '';
  imagePreview.classList.remove('active');
  document.querySelector('.upload-placeholder').classList.remove('hidden');
  imageInput.value = '';
  imageFile.value = '';
};

const clearProductForm = () => {
  productId.value = '';
  nameInput.value = '';
  companyInput.value = '';
  categoryInput.value = '';
  priceInput.value = '';
  imageInput.value = 'images/logo.jpeg';
  descriptionInput.value = '';
  shippingInput.checked = true;
  featuredInput.checked = false;

  productFormTitle.textContent = 'Tambah Produk';
  productSubmitBtn.textContent = 'Simpan';
  setHint(productFormHint, '');

  // Clear image preview
  removeImagePreview();
};

const requireAdmin = (user) => {
  return user && user.email && user.email.toLowerCase() === ADMIN_EMAIL;
};

const renderProducts = (products) => {
  productsTbody.innerHTML = products
    .map((p) => {
      const price = typeof p.price === 'number' ? p.price : 0;
      return `
        <tr>
          <td>${p.name || ''}</td>
          <td>${price.toLocaleString('id-ID')}</td>
          <td>${p.company || ''}</td>
          <td>${p.category || ''}</td>
          <td class="admin-actions-cell">
            <button class="btn admin-secondary" type="button" data-action="edit" data-id="${p.id}">Edit</button>
            <button class="btn admin-danger" type="button" data-action="delete" data-id="${p.id}">Hapus</button>
          </td>
        </tr>
      `;
    })
    .join('');
};

const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

let productsCache = [];

const refreshProducts = async () => {
  setHint(productsHint, 'Memuat...');
  try {
    productsCache = await fetchProducts();
    renderProducts(productsCache);
    setHint(productsHint, productsCache.length ? '' : 'Belum ada produk.');
  } catch (err) {
    console.log(err);
    setHint(productsHint, 'Gagal memuat produk. Cek Firestore Rules.');
  }
};

adminLogoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html';
});

productFormResetBtn.addEventListener('click', () => {
  clearProductForm();
});

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  setHint(productFormHint, '');

  const payload = {
    name: nameInput.value.trim(),
    company: companyInput.value.trim(),
    category: categoryInput.value.trim(),
    price: Number(priceInput.value),
    image: imageInput.value.trim(),
    description: descriptionInput.value.trim(),
    shipping: Boolean(shippingInput.checked),
    featured: Boolean(featuredInput.checked),
  };

  if (!payload.name || !payload.company || !payload.category || !payload.image || !payload.description) {
    setHint(productFormHint, 'Semua field wajib diisi.');
    return;
  }

  if (!Number.isFinite(payload.price) || payload.price < 0) {
    setHint(productFormHint, 'Harga tidak valid.');
    return;
  }

  try {
    const id = productId.value;
    if (id) {
      await updateDoc(doc(db, 'products', id), payload);
      setHint(productFormHint, 'Produk diperbarui.');
    } else {
      await addDoc(collection(db, 'products'), payload);
      setHint(productFormHint, 'Produk ditambahkan.');
    }

    clearProductForm();
    await refreshProducts();
  } catch (err) {
    console.log(err);
    setHint(productFormHint, 'Gagal menyimpan produk. Cek Firestore Rules.');
  }
});

refreshProductsBtn.addEventListener('click', async () => {
  await refreshProducts();
});

productsTbody.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;
  if (!action || !id) return;

  if (action === 'edit') {
    const product = productsCache.find((p) => p.id === id);
    if (!product) return;

    productId.value = product.id;
    nameInput.value = product.name || '';
    companyInput.value = product.company || '';
    categoryInput.value = product.category || '';
    priceInput.value = typeof product.price === 'number' ? product.price : 0;
    imageInput.value = product.image || 'images/logo.jpeg';
    descriptionInput.value = product.description || '';
    shippingInput.checked = Boolean(product.shipping);
    featuredInput.checked = Boolean(product.featured);

    productFormTitle.textContent = 'Edit Produk';
    productSubmitBtn.textContent = 'Update';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (action === 'delete') {
    const ok = window.confirm('Hapus produk ini?');
    if (!ok) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      await refreshProducts();
    } catch (err) {
      console.log(err);
      setHint(productsHint, 'Gagal hapus produk. Cek Firestore Rules.');
    }
  }
});

// Auth state check - redirect non-admin users
onAuthStateChanged(auth, async (user) => {
  if (!requireAdmin(user)) {
    // Redirect to login page if not admin
    window.location.href = 'login.html';
    return;
  }

  adminUserEl.textContent = user.email;
  clearProductForm();
  await refreshProducts();
});

// Image upload event listeners
imageUploadArea.addEventListener('click', () => {
  imageFile.click();
});

imageFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleImageUpload(file);
  }
});

removeImage.addEventListener('click', (e) => {
  e.stopPropagation();
  removeImagePreview();
});

// Drag and drop functionality
imageUploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  imageUploadArea.style.borderColor = 'var(--clr-primary-5)';
  imageUploadArea.style.background = 'var(--clr-primary-10)';
});

imageUploadArea.addEventListener('dragleave', (e) => {
  e.preventDefault();
  imageUploadArea.style.borderColor = 'var(--clr-grey-5)';
  imageUploadArea.style.background = 'var(--clr-grey-10)';
});

imageUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  imageUploadArea.style.borderColor = 'var(--clr-grey-5)';
  imageUploadArea.style.background = 'var(--clr-grey-10)';
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleImageUpload(files[0]);
  }
});
