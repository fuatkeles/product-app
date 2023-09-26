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
} from '@mui/material';
import '../App.css';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import fetchCategories from '../../fetchCategories'; // Özellikle bu satır önemli
import { db } from '../../firebase';
import { DeleteOutline, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';


import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

function createData(productName, category, retailer, stock, price, date) {
  return { productName, category, retailer, stock, price, date };
}

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

  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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
        // Firestore'dan verileri çek
        const productsData = await fetchProductsFromFirestore();
        setData(productsData);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
      }
    };

    // Verileri çek ve state'i güncelle
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
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  function createData(productName, category, retailer, stock, price, date) {
    return { productName, category, retailer, stock, price, date };
  }

  const handleAddProduct = async () => {
    // Firestore'a eklemek için veri objesi oluşturun
    const productData = {
      productName,
      category: selectedCategory,
      retailer,
      stock,
      price,
      date,
    };

    try {
      // Firestore koleksiyonuna veriyi ekle
      const docRef = await addDoc(collection(db, 'products'), productData);

      console.log('Document written with ID: ', docRef.id);

      // Diğer işlemler
      const newData = [...data, createData(productName, selectedCategory, retailer, stock, price, date)];
      setData(newData);
      setProductName('');
      setCategory('');
      setRetailer('');
      setStock('');
      setPrice('');
      setDate('');
      handleModalClose();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (row) => {
    // Bu satırın bilgilerini forma doldur
    setProductName(row.productName);
    setCategory(row.category);
    setRetailer(row.retailer);
    setStock(row.stock);
    setPrice(row.price);
    setDate(row.date);
    setModalOpen(true); // Modalı aç
  };
  
  const handleDelete = async (productId) => {
    // Firestore'dan silme işlemi
    try {
      await deleteProductFromFirestore(productId);
  
      // Tablodan silme işlemi
      const updatedData = data.filter((item) => item.id !== productId);
      setData(updatedData);
    } catch (error) {
      console.error('Hata: Ürün silinirken bir hata oluştu', error);
    }
  };
  
  const deleteProductFromFirestore = async (productId) => {
    const productDocRef = doc(db, 'products', productId);
  
    try {
      await deleteDoc(productDocRef);
      console.log('Product deleted successfully from Firestore.');
    } catch (error) {
      console.error('Error deleting product from Firestore:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container">
        <div className="addProductButton">
          <Button variant="outlined" onClick={handleModalOpen}>
            Add Product
          </Button>
        </div>
  
        <TableContainer className='tableContainer' component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Retailer</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Price $</TableCell>
                <TableCell align="left">Date YYYY/MM/DD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.productName}
                  </TableCell>
                  <TableCell>{capitalizeFirstLetter(row.category)}</TableCell>
                  <TableCell>{row.retailer}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell align="right">
                  <IconButton aria-label="Edit" onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={() => handleDelete(row.id)}>
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box className="modalBox">
          <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
            <TextField
              className='modalInput'
              label="Product Name"
              variant="outlined"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
             <FormControl variant="outlined" className='modalInput'>
          <InputLabel htmlFor="category-dropdown">Category</InputLabel>
          <Select
            className='categoryDropdown'
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            inputProps={{
              name: 'category',
              id: 'category-dropdown',
            }}
          >
            {fetchedCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {capitalizeFirstLetter(category)} {/* Kategorinin ilk harfini büyütüp yazdırma */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
            <TextField
              className='modalInput'
              label="Retailer"
              variant="outlined"
              fullWidth
              value={retailer}
              onChange={(e) => setRetailer(e.target.value)}
            />
            <TextField
              className='modalInput'
              label="Stock"
              variant="outlined"
              fullWidth
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              className='modalInput'
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              className='modalInput'
              
              variant="outlined"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
             <Button
        variant="contained"
        className='modalButton'
        onClick={handleAddProduct}
      >
        Add
      </Button>
          </Box>
        </Modal>
        
      </div>
    </div>
  );
  const handleProductFieldChange = (field, value) => {
    setSelectedProduct(prevProduct => ({
      ...prevProduct,
      [field]: value
    }));
  };
  
  const handleUpdateProduct = () => {
    // TODO: Firestore'daki ilgili ürünü güncelle
    // Ardından modal'ı kapat ve tabloyu güncelle
    handleModalClose();
  };
};

export default Products;
