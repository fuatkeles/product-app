import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'; // Firestore eklemeleri
import "../App.css"

const Brands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandInfo, setBrandInfo] = useState({ name: '', imgUrl: '' });
  const [brands, setBrands] = useState([]);
  const db = getFirestore(); // Firestore bağlantısı

  const fetchData = async () => {
    const q = query(collection(db, 'brands'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const brandList = [];
      querySnapshot.forEach((doc) => {
        brandList.push({ ...doc.data(), id: doc.id });
      });
      setBrands(brandList);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'brands'), (querySnapshot) => {
      const brandList = [];
      querySnapshot.forEach((doc) => {
        brandList.push({ ...doc.data(), id: doc.id });
      });
      setBrands(brandList);
    });
    return () => unsubscribe(); // Aboneliği iptal et
  }, []);

  const handleAddBrandClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setBrandInfo({ name: '', imgUrl: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBrandInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleAddBrand = async () => {
    try {
      const docRef = await addDoc(collection(db, 'brands'), brandInfo);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    handleModalClose();
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Button variant="outlined" onClick={handleAddBrandClick}>
          Add Brand
        </Button>

        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-modal-title">Add Brand</h2>
            <TextField
              label="Brand Name"
              variant="outlined"
              fullWidth
              name="name"
              value={brandInfo.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              name="imgUrl"
              value={brandInfo.imgUrl}
              onChange={handleInputChange}
            />
            <Button onClick={handleAddBrand}>Add</Button>
          </Box>
        </Modal>

        <div className='cardContainer'>
          {brands.map((brand, index) => (
            <Card className='card' key={index} >
              <CardMedia
                component="img"
                alt={brand.name}
                image={brand.imgUrl}
                className='cardImage'
              />
              <CardContent
                className='cardName'
                >
                <p>{brand.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
