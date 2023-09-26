// fetchCategories.js

const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Kategoriler alınamadı:', error);
      return [];
    }
  };
  
  export default fetchCategories;
  