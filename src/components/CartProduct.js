import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addToCart, changetax, removefromCart, removeItemfromCart } from '../redux/cart/cart.action';
import {connect } from 'react-redux';

function CartProduct({imageUrl,item, title,price,addCart, removeCart, removeItem, setTax}) {
  return (
    <Card sx={{ width: 300,margin:'10px' }}>
      <CardMedia
        component="img"
        width="100"
        height="200"
        image={imageUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <div>
        </div>
        <Typography gutterBottom variant="h6" component="div">
        ₹{price}/-
        </Typography>
      </CardContent>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tax</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={item.tax}
            onChange={(e) => {setTax({item, tax: e.target.value})}}
        >
            <MenuItem value={6}>6%</MenuItem>
            <MenuItem value={12}>12%</MenuItem>
            <MenuItem value={18}>18%</MenuItem>
        </Select>
        </FormControl>
      <CardActions>
          <Typography>
              Quantity:
            </Typography>
      <Badge color="secondary" badgeContent={item.quantity}>
          <ShoppingCartIcon />
        </Badge>
        <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
             removeCart(item);
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
            addCart(item);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </CardActions>
      <CardActions>
      <LoadingButton
        onClick={() => removeItem(item)}
        startIcon={<RemoveShoppingCartIcon />}
        loading={false}
        loadingPosition="start"
        color="secondary"
        variant="contained"
      >
        REMOVE
      </LoadingButton>
      </CardActions>
    </Card>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addCart : item => dispatch(addToCart(item)),
  removeCart: item => dispatch(removefromCart(item)),
  removeItem: item => dispatch(removeItemfromCart(item)),
  setTax : item => dispatch(changetax(item))
})
export default connect(null, mapDispatchToProps)(CartProduct);