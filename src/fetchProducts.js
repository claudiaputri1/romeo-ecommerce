import { db, collection, getDocs } from './firebaseconfig.js';

const fetchProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default fetchProducts;
