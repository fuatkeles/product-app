import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TableSortLabel,
  IconButton,
} from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { capitalizeFirstLetter } from '../helpers';

const headCells = [
  { id: 'productName', label: 'Product Name' },
  { id: 'category', label: 'Category' },
  { id: 'retailer', label: 'Retailer' },
  { id: 'stock', label: 'Stock' },
  { id: 'price', label: 'Price $' },
  { id: 'date', label: 'Date (YYYY/MM/DD)' },
];

const formatPrice = (price) => {
    // Config Price
    const numericPrice = parseFloat(price.replace(',', '.'));
    return numericPrice.toFixed(2).replace('.', ',');
  };
  const compareNumeric = (a, b) => {
    return a - b;
  };

const ProductTable = ({ data, handleEdit, handleDelete, handleRequestSort, order, orderBy, loading }) => {
  if (!data) {
    return (
      <TableContainer className='tableContainer' component={Paper}>
        <Table>
          <TableHead>
            <TableRow >
              {headCells.map((headCell) => (
                <TableCell className="tableHeader" key={headCell.id} align="left"  >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }

  
  
  return (
    <TableContainer className='tableContainer' component={Paper} style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px', borderRadius: '10px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" inputProps={{ 'aria-label': 'select all desserts' }} />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.id === 'price' ? 'right' : 'left'}
                style={{ paddingRight: headCell.id === 'price' ? '24px' : '12px' }}
                sortDirection={orderBy === headCell.id ? order : false}
                className="tableHeader"
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  <span className="headerText">{headCell.label}</span>
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="right">
              <span className="headerText">Actions</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.id === 'price' ? 'right' : 'left'}
                  style={{ paddingRight: headCell.id === 'price' ? '24px' : '12px' }}
                >
                  {headCell.id === 'category'
                    ? capitalizeFirstLetter(row[headCell.id])
                    : headCell.id === 'price'
                    ? formatPrice(row[headCell.id])
                    : row[headCell.id]}
                </TableCell>
              ))}
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
  );
};

export default ProductTable;