import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableContainer,
  Paper,
  Typography
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import {
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import "../App.css";

const Brands = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedBy, setSortedBy] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const getProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsList);
    };

    getProducts();
  }, [db]);

  const handleSort = (key) => {
    const order = (sortedBy === key && sortOrder === 'asc') ? 'desc' : 'asc';
    const sortedProducts = [...products].sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setProducts(sortedProducts);
    setSortOrder(order);
    setSortedBy(key);
  };
  const capitalizeFirstLetter = (string) => {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const uniqueRetailersAndCategories = {};

  products.forEach((product) => {
    const key = `${product.retailer}_${product.category}`;
    if (!uniqueRetailersAndCategories[key]) {
      uniqueRetailersAndCategories[key] = product;
    }
  });

  const uniqueProducts = Object.values(uniqueRetailersAndCategories);
  return (
    <div>
    <Sidebar />
    <Typography variant="h3" style={{ marginLeft: '15%', marginTop: '2.5%' }}>
      Retailers
    </Typography>
    <div className="table-container">
      <TableContainer component={Paper} style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px', borderRadius: '10px' }}>
        <Table style={{ borderRadius: '20px' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortedBy === 'retailer'}
                  direction={sortedBy === 'retailer' ? sortOrder : 'asc'}
                  onClick={() => handleSort('retailer')}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Retailer</span>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortedBy === 'category'}
                  direction={sortedBy === 'category' ? sortOrder : 'asc'}
                  onClick={() => handleSort('category')}
                >
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Category</span>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueProducts.map((product, index) => (
              <TableRow key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <TableCell>
                  <div style={{ borderRadius: '20px' }}>
                    {product.retailer}
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ borderRadius: '20px' }}>
                    {capitalizeFirstLetter(product.category)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>
  );
};

export default Brands;
