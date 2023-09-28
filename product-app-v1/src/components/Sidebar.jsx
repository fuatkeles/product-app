import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Brands from '../pages/Brands';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Sidebar = () => {
  const [open, setOpen] = useState(true); 
  const [brands, setBrands] = useState(['Brand 1', 'Brand 2', 'Brand 3']);
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate('/brands');
  };

  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
    navigate('/home');
  };

  const handleProductsClick = () => {
    navigate('/products');
  };

  const handleLogOutClick = () => {
    navigate('/login');
  };
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerWidth = 270;

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/fuat-keles/'); 
  };
  const handleGithubClick = () => {
    window.open('https://www.github.com/fuatkeles');
    
  };

  return (
    <div className="custom-sidebar">
     
     <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflow: 'hidden',
            backgroundColor: 'rgb(239, 227, 250)',
            transition: 'width 0.3s', // Geçiş ekle
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        className="sidebar"
      >
        
        <List className="sidebarList">
          <ListItem button className="sidebarListItem" onClick={handleDashboardClick}>
          
              <DashboardIcon />
            
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 0,
              }}
            />
          </ListItem>
          <ListItem button className="sidebarListItem" onClick={() => handleProductsClick('Products')}>
          <ShoppingCartCheckoutIcon />
            <ListItemText
              primary="Products"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 0,
              }}
            />
          </ListItem>
          <ListItem button className="sidebarListItem" onClick={() => handleBrandClick('Brands')}>
          <StorefrontIcon />
            <ListItemText
              primary="Brands"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 0,
              }}
            />
          </ListItem>
         <div className="socialLink">
          <ListItem button className="sidebarCopy" onClick={() => handleLinkedInClick('')}>
          <LinkedInIcon />
            <ListItemText
              primary="LinkedIn"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 0,
              }}
            />
          </ListItem>
          <ListItem button className="sidebarCopy" onClick={() => handleGithubClick('')}>
          <GitHubIcon />
            <ListItemText
              primary="Github"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 0,
              }}
            />
          </ListItem>
          </div>
        </List>
        <ListItem button className="sidebarlogOutItem" onClick={handleLogOutClick}>
        <LogoutIcon />
          <ListItemText
            primary="Log Out"
            primaryTypographyProps={{
              fontSize: 20,
              fontWeight: 'medium',
              letterSpacing: 0,
            }}
          />
        </ListItem>
      </Drawer>
      <div style={{
          marginLeft: open ? drawerWidth : 0,
          transition: 'margin .3s', // Geçiş ekle
        }}>
        <IconButton
          color="inherit"
          aria-label={open ? 'close drawer' : 'open drawer'}
          onClick={handleDrawerToggle}
          sx={{ alignSelf: 'flex-start', marginBottom: 'auto' }}
        >
          <MenuIcon />
        </IconButton>
        </div>
    </div>
  );
};

export default Sidebar;
