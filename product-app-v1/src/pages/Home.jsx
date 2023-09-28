import React from 'react';
import Sidebar from '../components/Sidebar';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,  } from 'recharts';
import { app, auth, db } from '../../firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';




const Home = () => {
  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [userData, setUserData] = useState(null);

  

  // Fonksiyon ile bugünün tarihini al
  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Firestore'dan verileri çek
    const fetchProductData = async () => {
      try {
        const productsCol = collection(db, 'products'); // Change this line
        const snapshot = await getDocs(productsCol); // Change this line
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          
        }));
        setProductData(products);
        console.log('Fetched product data:', products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProductData();
  }, []);

  const calculateRetailerCounts = (data) => {
    const counts = {};
    data.forEach(item => {
      const retailer = item.retailer;
      counts[retailer] = counts[retailer] ? counts[retailer] + 1 : 1;
    });
    return counts;
  };

  const retailerCounts = calculateRetailerCounts(productData);

  const retailerData = Object.keys(retailerCounts).map((key, index) => ({
    retailer: key,
    count: retailerCounts[key],
    color: getRandomColor(),
  }));


  return (
    <div className='backGroundClass'>
      <Sidebar />
      
      <div style={{ marginLeft: '15%', padding: '20px', marginTop:'3%', width:'20%' }}> 
        <Card style={{boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px', borderRadius: '10px', minWidth:'200px', marginRight: '10vw' } }>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '16px', marginTop:'3%'}}>
              Today's Date
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '16px', color: 'rgb(186, 115, 252)', marginTop:'3%'}}>
  {getCurrentDate()}
</Typography>

          </CardContent>
        </Card>
      
      </div>

      <div className="graph">
      {productData.length > 0 && (
        <div>
          <Typography variant="h4" style={{  padding: '20px', textAlign: 'center' }}>
          Stock
      </Typography>
          <BarChart className='bar' width={650} height={400} data={productData} >
            
            <XAxis dataKey="productName" />
            <YAxis domain={[0, 200]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#8884d8" />
          </BarChart>
        </div>
      )}

      <div style={{ textAlign: 'center', fontFamily:'san francisco' }}>
      <Typography variant="h4" style={{ padding: '20px', }}>
          Retailers
      </Typography>
        <PieChart className='pie' width={650} height={400}>
          <Pie
            data={retailerData}
            dataKey="count"
            nameKey="retailer"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {retailerData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
    </div>
    
  );
};

export default Home;
