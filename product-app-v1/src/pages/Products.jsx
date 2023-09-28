import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
  Checkbox,
  Box,
  Paper,
  Modal,
  TextField,
  Button,
  Select, MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import '../App.css';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import fetchCategories from '../../fetchCategories'; 
import { db } from '../../firebase';
import { DeleteOutline, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

function createData(productName, category, retailer, stock, price, date) {
  return { productName, category, retailer, stock, price, date };
}
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const headCells = [
  { id: 'productName', numeric: false, disablePadding: true, label: 'Product Name' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'retailer', numeric: false, disablePadding: false, label: 'Retailer' },
  { id: 'stock', numeric: true, disablePadding: false, label: 'Stock' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price $' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date YYYY/MM/DD' },
];
const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [retailer, setRetailer] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [orderBy, setOrderBy] = useState('productName');
  const [order, setOrder] = useState('asc');
  const [isEditing, setIsEditing] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const fetchProductsFromFirestore = async () => {
    const productsCollectionRef = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollectionRef);
    const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return productsData;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get datas from Firestore
        const productsData = await fetchProductsFromFirestore();
        setData(productsData);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
      }
    };
    // Update State
    fetchData();
  }, []); 
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categories = await fetchCategories();
        setFetchedCategories(categories);
      } catch (error) {
        console.error('Kategoriler alınamadı:', error);
      }
    };
    fetchCategoriesData();
  }, []);
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property); 
    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
      } else {
        if (a[property] > b[property]) return -1;
        if (a[property] < b[property]) return 1;
        return 0;
      }
    });
    setData(sortedData);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
    setIsEditing(false);
    setUpdatedProduct(null); 
    // Clear Inputs
    setProductName('');
    setSelectedCategory('');
    setRetailer('');
    setStock('');
    setPrice('');
    setDate('');
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  function createData(productName, category, retailer, stock, price, date) {
    return { productName, category, retailer, stock, price, date };
  }
  const refreshTable = async () => {
    try {
      // Firestore
      const productsData = await fetchProductsFromFirestore();
      setData(productsData);
    } catch (error) {
      console.error('Error fetching data from Firestore: ', error);
    }
  };
  
  const handleAddProduct = async () => {
    try {
      setLoading(true);  
      const productData = {
        productName,
        category: selectedCategory,
        retailer,
        stock,
        price ,
        date,
      };
      const docRef = await addDoc(collection(db, 'products'), productData);  
      console.log('Document written with ID: ', docRef.id); 
      const newData = [...data, createData(productName, selectedCategory, retailer, stock, price, date)];
      setData(newData);
      setProductName('');
      setSelectedCategory('');
      setRetailer('');
      setStock('');
      setPrice('');
      setDate('');
      handleModalClose();
      setLoading(false);
      // TUpdate Table
      refreshTable();
    } catch (error) {
      console.error('Error adding document: ', error);
      setLoading(false);
    }
  };
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (row) => {
    // Fill the Form
    setProductName(row.productName);
    setCategory(row.category);
    setRetailer(row.retailer);
    setStock(row.stock);
    setPrice(row.price);
    setDate(row.date);
    setSelectedProduct(row); 
    setModalOpen(true); 
    setIsEditing(true); 
  };
  
const handleDelete = async (productId) => {
  const productDocRef = doc(db, 'products', productId);
  await deleteProductFromFirestore(productId, productDocRef);
  // Clearing table
  const updatedData = data.filter((item) => item.id !== productId);
  setData(updatedData);
};
const deleteProductFromFirestore = async (productId, productDocRef) => {
  try {
    await deleteDoc(productDocRef);
    console.log('Product deleted successfully from Firestore:', productId);
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
  }
};
const handleUpdateProduct = async () => {
  if (!selectedProduct) {
    console.error('No product selected for update.');
    return;
  }
  const updatedProductData = {
    productName,
    category: selectedCategory,
    retailer,
    stock,
    price,
    date,
  };
  try {
    // Update the product in Firestore using its ID
    const productDocRef = doc(db, 'products', selectedProduct.id);
    await updateDoc(productDocRef, updatedProductData);
    // Log the updated product data and success message
    console.log('Updated product data:', updatedProductData);
    console.log('Product updated successfully.');
    // Close the modal
    refreshTable();
    handleModalClose();
  } catch (error) {
    console.error('Error updating product: ', error);
  }
};
  return (
    <div>
      <Sidebar />
      <Typography variant="h3" style={{ marginLeft: '15%', marginTop:'2.5%' }}>
          Products
      </Typography>
      <div className="container">
        <div className="addProductButton">
          <Button variant="contained" onClick={handleModalOpen} >
            Add Product
          </Button>
        </div>
        {loading && <CircularProgress />}
        <ProductTable
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleRequestSort={handleRequestSort} 
          order={order}  
          orderBy={orderBy} 
          handleUpdate={handleUpdateProduct} 
        />
        <ProductForm
          isEditing={isEditing}
          modalOpen={modalOpen} 
          handleAddProduct={handleAddProduct}
          handleUpdateProduct={handleUpdateProduct}
          fetchedCategories={fetchedCategories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          productName={productName}
          setProductName={setProductName}
          retailer={retailer}
          setRetailer={setRetailer}
          stock={stock}
          setStock={setStock}
          price={price}
          setPrice={setPrice}
          date={date}
          setDate={setDate}
        />
        <CircularProgress style={{ display: loading ? 'block' : 'none', margin: '20px auto' }} />       
      </div>
    </div>
  );
};
export default Products;
