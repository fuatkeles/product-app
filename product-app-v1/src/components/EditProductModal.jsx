import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { capitalizeFirstLetter } from './helpers'; // varsayılan bir yardımcı dosya olduğunu varsayıyoruz

const EditProductModal = ({ open, onClose, product, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleFieldChange = (field, value) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedProduct);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="modalBox">
        <TextField
          className='modalInput'
          label="Product Name"
          variant="outlined"
          fullWidth
          value={editedProduct.productName}
          onChange={(e) => handleFieldChange('productName', e.target.value)}
        />
        {/* Kategori */}
        <TextField
          className='modalInput'
          label="Category"
          variant="outlined"
          fullWidth
          value={editedProduct.category}
          onChange={(e) => handleFieldChange('category', e.target.value)}
        />
        {/* Perakendeci */}
        <TextField
          className='modalInput'
          label="Retailer"
          variant="outlined"
          fullWidth
          value={editedProduct.retailer}
          onChange={(e) => handleFieldChange('retailer', e.target.value)}
        />
        {/* Stok */}
        <TextField
          className='modalInput'
          label="Stock"
          variant="outlined"
          fullWidth
          type="number"
          value={editedProduct.stock}
          onChange={(e) => handleFieldChange('stock', e.target.value)}
        />
        {/* Fiyat */}
        <TextField
          className='modalInput'
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          value={editedProduct.price}
          onChange={(e) => handleFieldChange('price', e.target.value)}
        />
        {/* Tarih */}
        <TextField
          className='modalInput'
          variant="outlined"
          fullWidth
          type="date"
          value={editedProduct.date}
          onChange={(e) => handleFieldChange('date', e.target.value)}
        />
        <Button variant="contained" className='modalButton' onClick={handleUpdate}>
          Güncelle
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;