import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setCartData, setMenuPrice, setEntities } from './store/storeSlice';
import { Button, Box, TextField, Card, CardContent, Container } from "@mui/material";

function Checkout() {
  const dispatch = useDispatch();
  var { cartData, entities } = useSelector((state) => state.store);
  var totalPrice = useSelector((state) => state.store.totalPrice);

  useEffect(() => {
    //
  });

  const handleAddQuantity = (obj) => {
    let modifiedData = entities.map((res) => {
      if (res.name == obj.name) {
        let copiedObj = JSON.parse(JSON.stringify(res));
        copiedObj.quantity = (copiedObj.quantity == null ? 0 : copiedObj.quantity + 1);
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

  const handleRemoveQuantity = (obj) => {
    let modifiedData = entities.map((res) => {
      if (res.name == obj.name) {
        let copiedObj = JSON.parse(JSON.stringify(res));
        copiedObj.quantity = (copiedObj.quantity == null ? 0 : copiedObj.quantity - 1);
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

  return (
    <Container className="menu-card">
      {cartData && cartData.length > 0 ? cartData.map((res) => (
        <>
          <Card key={res._id}>
            <CardContent>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                <Box gridColumn="span 9">
                  <div className="fw-bold">{res.name}</div>
                  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                    <Box gridColumn="span 4" className="fw-bold text-danger">${res.amount}</Box>
                    <Box gridColumn="span 2">
                      <div className="border text-center">
                        x{res.quantity}
                      </div>
                    </Box>
                  </Box>
                </Box>

                <Box gridColumn="span 3">
                  <Button variant="outline-secondary" size="small" onClick={() => handleRemoveQuantity(res)}>
                    -
                  </Button>

                  <Button variant="outline-secondary" style={{ marginLeft: 5 }} size="small" onClick={() => handleAddQuantity(res)}>
                    +
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <hr style={{ margin: 0 }} />
        </>
      )) : <></>
      }

      <Card>
        <CardContent>
          <Box className="mt-4" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
            <Box gridColumn="span 9">
              <h4>Total Amount</h4>
            </Box>

            <Box className="text-right" gridColumn="span 3">
              <h5>${totalPrice}</h5>
            </Box>
          </Box>

          <Box className="mb-3" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
            <Box gridColumn="span 3">
              <h6>Enter coupon</h6>
            </Box>

            <Box gridColumn="span 4">
              <TextField id="coupon" label="Your Name" variant="outlined" required className="mb-2" size="small" />
            </Box>

            <Box gridColumn="span 4">
              <Button className="btn-color" size="small">
                Validate coupon
              </Button>
            </Box>
          </Box>

          <hr style={{ margin: 0 }} />

          <Box className="mt-2" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
            <Box gridColumn="span 12" component="form" autoComplete="off">
              <TextField id="yourname" label="Your Name" variant="outlined" required className="mb-2" size="small" />
              <br />
              <TextField id="street" label="Street" variant="outlined" required className="mb-2" size="small" />
              <br />
              <TextField id="postalcode" label="Postal Code" variant="outlined" required className="mb-2" size="small" />
              <br />
              <TextField id="city" label="City" variant="outlined" required className="mb-2" size="small" />
              <br />
              <TextField id="phone" label="Phone" variant="outlined" required className="mb-2" size="small" />
            </Box>
          </Box>

          <hr style={{ margin: 0 }} />

          <Box className="mt-2" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
            <Box gridColumn="span 12" className="d-flex justify-content-end">
              <Button variant="outlined" color="primary">
                Close
              </Button>

              <Button variant="contained" color="primary" style={{ marginLeft: 5 }}>
                Order
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Checkout;