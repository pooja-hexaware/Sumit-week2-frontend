import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { getMenuByStore } from './store/store.action'
import { styled } from '@mui/material/styles';
import { setCartData, setMenuPrice, setEntities, setCurrentMenuData, setToppingPrice } from './store/storeSlice';
import {
  Container, Button, Box, FormControl, InputLabel, Input, Card, CardContent, Typography, Paper, Grid,
  DialogContent, DialogActions, Dialog, DialogTitle, IconButton, Checkbox
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 600,
  color: theme.palette.text.primary,
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function MenuListByStore() {
  const dispatch = useDispatch();
  const { entities, currentMenuData } = useSelector((state) => state.store)
  var toppingPrice = useSelector((state) => state.store.toppingPrice)
  const [btnToppings, setBtnToppings] = useState();

  let { id: id } = useParams();

  useEffect(() => {
    dispatch(getMenuByStore({ id: id }));
    console.log('menudata: ' + currentMenuData);
  }, [dispatch])

  const handleShow = (obj) => {
    setOpen(true);
    dispatch(setCurrentMenuData(obj));
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const HandleDialog = () => {
    setOpen(true);
  };

  const handleAddQuantity = (obj) => {
    let modifiedData = entities.map((res) => {
      if (res.name == obj.name) {
        let copiedObj = JSON.parse(JSON.stringify(res));
        copiedObj.quantity = (copiedObj.quantity == null ? 0 : parseInt(copiedObj.quantity) + 1);
        return copiedObj;
      } else {
        return res;
      }
    });

    let filteredCartData = modifiedData.filter(x => x.quantity > 0);

    let price = filteredCartData.reduce(function (prev, cur) {
      return prev + parseFloat(cur.amount) * cur.quantity;
    }, 0);

    dispatch(setCartData(filteredCartData));
    dispatch(setMenuPrice(price));
    dispatch(setEntities(modifiedData));
  }

  const handleOnChange = (e) => {
    let updatedMenu = currentMenuData.allowedToppings.map((x) => {
      let currentTopping = JSON.parse(JSON.stringify(x));

      if (x._id == e.target.id && e.target.checked) {
        toppingPrice = parseFloat(toppingPrice) + parseFloat(x.price);
        currentTopping.isChecked = e.target.checked;
      }
      else if (x._id == e.target.id && !e.target.checked) {
        toppingPrice = parseFloat(toppingPrice) - parseFloat(x.price);
        currentTopping.isChecked = e.target.checked;
      }

      return currentTopping;
    });

    let updatedMenuData = entities.map((md) => {
      if (md._id == currentMenuData._id) {
        let currentMenu = JSON.parse(JSON.stringify(md));

        currentMenu.allowedToppings = updatedMenu;
        dispatch(setCurrentMenuData(currentMenu));
        return currentMenu;
      }
      else
        return md;
    });

    let filteredCartData = updatedMenuData.filter(x => x.quantity > 0);

    dispatch(setCartData(filteredCartData));
    dispatch(setEntities(updatedMenuData));
    dispatch(setToppingPrice(toppingPrice));
  };

  return (
    <Container className="menu-card">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
        <Box gridColumn="span 12">
          <StyledPaper
            sx={{
              my: 1,
              mx: 'auto',
              p: 2
            }}
            style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#2763db', textAlign: 'center', marginBottom: 20 }}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs>
                <Typography variant="h4">Good Food, Great Time</Typography>
                <Typography variant="caption">
                  Our chefs at WiWi make delicious food selections every week - you pick, we cook and deliver.
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>

          <Card>
            <CardContent>
              {JSON.stringify(entities) === '[]' ? <></>
                : entities.map((res) => (
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                        <Box gridColumn="span 9">
                          <div style={{ fontWeight: 'bold' }}>{res.name}</div>
                          <div style={{ fontStyle: 'italic' }}>{res.description}</div>

                          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                            <Box gridColumn="span 2" style={{ fontWeight: 'bold', color: 'red' }}>${res.amount}</Box>
                            <Box gridColumn="span 3">
                              <Button type="button"
                                className="ml-10"
                                variant="contained"
                                color="primary" size="small" onClick={() => handleShow(res)}>
                                + Toppings
                              </Button>
                            </Box>
                          </Box>
                        </Box>

                        <Box gridColumn="span 3">
                          <FormControl>
                            <InputLabel htmlFor="qty" style={{ fontWeight: 'bold' }}>Quantity</InputLabel>
                            <Input id="qty" aria-describedby="qty-text" value={res.quantity} />
                          </FormControl>

                          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                            <Box gridColumn="span 12" className="d-flex justify-content-end">
                              <Button variant="contained" color="primary" className="btn-color" size="small" onClick={() => handleAddQuantity(res)}>
                                + Add
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="toppings"
        open={open}
      >
        <DialogContent dividers>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              {JSON.stringify(currentMenuData) === '{}' ? <></>
                : currentMenuData.allowedToppings.map((x) => (
                  <Card>
                    <CardContent>
                      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                        <Box gridColumn="span 3">
                          <img src={x.background && x.background != null ? x.background : "/img/smallimagefood.png"} alt="food1" />
                        </Box>

                        <Box gridColumn="span 6">
                          <div>{x.name}</div>
                          <div>{x.cal}</div>
                        </Box>

                        <Box gridColumn="span 3">
                          <Checkbox id={x._id}
                            name={x.name} onChange={(e) => handleOnChange(e)} checked={x.isChecked} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </Container>
  )
}

export default MenuListByStore;
