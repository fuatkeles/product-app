import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Box,
  IconButton , 
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../helpers';
import fetchCategories from '../../fetchCategories'; // Import the fetchCategories function
import CloseIcon from '@mui/icons-material/Close';


const ProductForm = ({
  isEditing,
  handleAddProduct,
  handleUpdateProduct,
  fetchedCategories,
  selectedCategory,
  handleCategoryChange,
  productName,
  setProductName,
  retailer,
  setRetailer,
  stock,
  setStock,
  price,
  setPrice,
  date,
  setDate,
  modalOpen,
  handleModalClose,
}) => {

  const handleFormSubmit = () => {
    // Check if any required field is empty
    if (!productName || !selectedCategory || !retailer || !stock || !price || !date) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    // Call the appropriate action based on whether it's editing or adding
    if (isEditing) {
      handleUpdateProduct();
    } else {
      handleAddProduct();
    }
  };
  

  return (
    <div>
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
              required
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
            required
          >
            {fetchedCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {capitalizeFirstLetter(category)} 
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
              required
            />
            <TextField
              className='modalInput'
              label="Stock"
              variant="outlined"
              fullWidth
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <TextField
              className='modalInput'
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value) + ",00"}
              required
            />
            <TextField
              className='modalInput'
              
              variant="outlined"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          <Button
  variant="contained"
  className='modalButton'
  onClick={() => {
    // Check if any required field is empty
    if (!productName || !selectedCategory || !retailer || !stock || !price || !date) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (isEditing) {
      handleUpdateProduct();
    } else {
      handleAddProduct();
    }
  }}
>
  {isEditing ? 'Update' : 'Add'}
</Button>
          </Box>
        </Modal>
    </div>
  );
};
export default ProductForm;
