import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Brands from '../pages/Brands';
import { useNavigate } from 'react-router-dom'; // useHistory yerine useNavigate

const Sidebar = () => {
  const [brands, setBrands] = useState(['Brand 1', 'Brand 2', 'Brand 3']);
  const navigate = useNavigate(); // useNavigate'i al

  const handleBrandClick = () => {
    
    navigate('/brands');
  };

  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
    // Dashboard'e tıklandığında sayfa geçişi yap
    navigate('/home');
  
  }

  const handleProductsClick = () => {
    navigate('/products');
  }

  const handleLogOutClick = () => {
    navigate('/login');
  }

  const drawerWidth = 270;

  return (
    <div className="custom-sidebar">
      <Drawer sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflow: 'hidden',
            backgroundColor: 'rgb(239, 227, 250)',
          },
        }} variant="permanent" className='sidebar' >
        <List className="sidebarList">
          <ListItem button className="sidebarListItem">
            <ListItemText primary="Dashboard" primaryTypographyProps={{
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 0,
            }} onClick={handleDashboardClick} />
          </ListItem>
          <ListItem button className="sidebarListItem">
            <ListItemText primary="Products" primaryTypographyProps={{
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 0,
            }} onClick={() => handleProductsClick('Products')} />
          </ListItem>
          <ListItem button className="sidebarListItem">
            <ListItemText primary="Brands" primaryTypographyProps={{
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 0,
            }} onClick={() => handleBrandClick('Brands')} />
          </ListItem>
        </List>
        <ListItem button className="sidebarlogOutItem">
          <ListItemText primary="Log Out" primaryTypographyProps={{
            fontSize: 20,
            fontWeight: 'medium',
            letterSpacing: 0,
          }} onClick={handleLogOutClick} />
        </ListItem>
      </Drawer>
    </div>
  );
};

export default Sidebar;
