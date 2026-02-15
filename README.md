# ROMEO E-Commerce

Marketplace Barang Bekas Berkualitas - Platform e-commerce untuk barang bekas dengan fokus pada konsumsi bertanggung jawab.

## 🌟 Tentang Project

ROMEO adalah platform e-commerce modern yang menghubungkan penjual dan pembeli barang bekas berkualitas. Dibangun dengan teknologi web modern dan Firebase untuk backend yang scalable.

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan CSS Variables
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **Font Awesome** - Icons library

### Backend & Services
- **Firebase Firestore** - Database NoSQL real-time
- **Firebase Authentication** - User management & auth
- **Firebase Hosting** - Static web hosting

### Tools & Libraries
- **Module System** - ES6 modules untuk code organization
- **Local Storage** - Client-side cart management
- **Responsive Design** - Mobile-first approach

## 🚀 Fitur Utama

### 🛍️ Fitur Customer
- **Browse Products** - Jelajahi katalog produk dengan filter
- **Search Functionality** - Pencarian produk berdasarkan nama, kategori, deskripsi
- **Shopping Cart** - Keranjang belanja dengan localStorage
- **Product Details** - View detail produk dengan gambar
- **User Authentication** - Login/logout untuk pengalaman personal
- **Responsive Design** - Optimal di semua perangkat

### 👨‍💼 Fitur Admin
- **Admin Dashboard** - Panel kontrol untuk manajemen
- **Product CRUD** - Create, Read, Update, Delete produk
- **Image Upload** - Upload gambar produk dari file lokal
- **Product Management** - Kelola stok, harga, kategori
- **Featured Products** - Tandai produk sebagai unggulan
- **Role-based Access** - Hanya admin yang bisa akses panel

### 🔐 Keamanan & Authentication
- **Firebase Auth** - Email/password authentication
- **Role-based Access** - Admin access control
- **Firestore Rules** - Database security rules
- **Protected Routes** - Akses terbatas untuk admin functions

## 📁 Struktur Project

```
js-e-commerce/
├── index.html              # Homepage
├── products.html           # Product listing page
├── admin.html              # Admin dashboard
├── login.html              # Login page
├── about.html              # About page
├── product.html            # Single product detail
├── styles.css              # Global styles
├── firebase.json           # Firebase hosting config
├── firestore-rules.txt     # Database security rules
├── README.md               # Project documentation
├── images/                 # Static images
│   └── logo.jpeg
└── src/
    ├── firebaseconfig.js   # Firebase configuration
    ├── auth/
    │   └── navAuth.js      # Navigation auth logic
    ├── cart/
    │   ├── setupCart.js    # Cart functionality
    │   └── toggleCart.js   # Cart UI controls
    ├── filters/
    │   └── search.js       # Search functionality
    ├── pages/
    │   ├── admin.js        # Admin dashboard logic
    │   ├── login.js        # Login page logic
    │   ├── products.js     # Product listing logic
    │   └── user.js         # User dashboard
    ├── displayProducts.js  # Product display logic
    ├── fetchProducts.js    # Product data fetching
    ├── store.js            # Global state management
    ├── toggleSidebar.js    # Mobile sidebar
    └── utils.js            # Utility functions
```

## 🚀 Quick Start

### Prerequisites
- Node.js (untuk development server opsional)
- Akun Firebase
- Text editor/IDE

### 1. Clone Repository
```bash
git clone <repository-url>
cd js-e-commerce
```

### 2. Setup Firebase Project
1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Enable **Firestore Database** dan **Authentication**
3. Setup **Hosting** untuk deployment

### 3. Configure Firebase
1. Copy Firebase config dari project settings
2. Update `src/firebaseconfig.js` dengan config Anda:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Setup Firestore Rules
Copy rules dari `firestore-rules.txt` ke Firebase Console:
- Buka Firestore → Rules
- Paste dan Publish rules

### 5. Run Application
```bash
# Option 1: Live server
npx live-server

# Option 2: Python server
python -m http.server 8000

# Option 3: Open directly
open index.html
```

## 🔥 Firebase Configuration

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.email == "admin@gmail.com";
    }
    
    function isValidProduct(data) {
      return data.keys().hasAll([
        "name", "company", "price", "description", 
        "category", "shipping", "image", "featured"
      ]) && /* validation logic */;
    }
    
    match /products/{productId} {
      allow read: if true;
      allow create, update: if isAdmin() && isValidProduct(request.resource.data);
      allow delete: if isAdmin();
    }
  }
}
```

### Authentication Setup
1. Enable **Email/Password** sign-in method
2. Create admin account: `admin@gmail.com`
3. Set custom claims jika needed

## 📱 Responsive Design

### Breakpoints
- **Mobile**: ≤ 767px
- **Tablet**: 768px - 991px  
- **Desktop**: ≥ 992px
- **Large Desktop**: ≥ 1200px

### Features
- Mobile-first approach
- Touch-friendly interfaces
- Optimized navigation
- Responsive tables
- Flexible grids

## 🛒 Product Schema

```javascript
{
  name: "String - Nama produk",
  company: "String - Nama perusahaan/penjual",
  price: "Number - Harga produk",
  description: "String - Deskripsi produk",
  category: "String - Kategori produk",
  shipping: "Boolean - Apakah tersedia pengiriman",
  image: "String - URL gambar produk",
  featured: "Boolean - Apakah produk unggulan"
}
```

## 👥 User Roles

### Customer
- Browse dan search produk
- Add to cart dan checkout
- Login/logout
- View product details

### Admin (`admin@gmail.com`)
- Semua customer features
- CRUD operations untuk produk
- Image upload functionality
- Product management dashboard
- View semua data produk

## 🔧 Development

### Code Organization
- **Modular Architecture** - ES6 modules
- **Separation of Concerns** - Logic terpisah dari UI
- **Reusable Components** - Utility functions
- **State Management** - Global store pattern

### Best Practices
- **Semantic HTML5**
- **CSS Variables** untuk theming
- **Error Handling** yang comprehensive
- **Loading States** untuk UX
- **Form Validation** client-side
- **Responsive Images**

## 🚀 Deployment

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login ke Firebase
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

### Configuration
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**Firebase Authentication Error**
- Pastikan Firebase config benar
- Check API keys restrictions
- Enable Email/Password auth method

**Firestore Permission Error**
- Update Firestore rules
- Check user authentication state
- Verify admin email (`admin@gmail.com`)

**Responsive Issues**
- Check viewport meta tag
- Validate CSS media queries
- Test dengan dev tools

**Image Upload Issues**
- Check file size limits (5MB max)
- Validate file types (JPG, PNG, GIF)
- Verify base64 encoding

### Debug Tips
```javascript
// Check auth state
onAuthStateChanged(auth, (user) => {
  console.log('Auth state:', user);
});

// Check Firestore connection
const testDoc = await getDocs(collection(db, 'products'));
console.log('Products count:', testDoc.size);
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

Project ini menggunakan license MIT. Lihat [LICENSE](LICENSE) file untuk details.

## 📞 Support

Untuk pertanyaan atau support:
- Create issue di GitHub
- Email: support@example.com
- Documentation: [Wiki](wiki-link)

## 🔄 Version History

- **v1.0.0** - Initial release
  - Basic e-commerce functionality
  - Firebase integration
  - Responsive design
  - Admin panel

---

**ROMEO E-Commerce** - Marketplace barang bekas berkualitas 🛍️