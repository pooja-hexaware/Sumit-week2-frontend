import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Container, Box, Card, CardContent, FormControl, FormControlLabel, FormGroup, Button, TextField, InputLabel, Checkbox } from '@mui/material';
import { findStore } from './store/store.action';

function FindStore() {
  const dispatch = useDispatch();
  var entities = useSelector((state) => state.store.entities);
  const [searchText, setSearchText] = useState();

  const onSearchTextChange = e => {
    setSearchText(e.target.value);
  }

  const onSearch = () => {
    // set data using action methods options
    dispatch(findStore(searchText));
  }

  const handleOnChange = () => {
    //
  }

  return (
    <>
      <Container className="menu-card">
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
          <Box gridColumn="span 5">
            <h1>FIND A</h1>
            <h1>STORE</h1>
          </Box>

          <Box gridColumn="span 7">
            <div className="b-left p-2">
              <Card>
                <CardContent>
                  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                    <Box gridColumn="span 8">
                      <FormControl>
                        <TextField id="search" size="small" style={{ width: '200%' }}
                          value={searchText} onChange={onSearchTextChange} label="Search" variant="outlined" />
                      </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                      <Button variant="contained" color="error" size="small" onClick={onSearch}>
                        SEARCH
                      </Button>
                    </Box>
                  </Box>

                  <Box display="grid" className="pt-4" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                    {["ATM", "Diesel", "E85", "eBlend", "fReal", "Fresh Food",
                      "Pay at the Pump", "Pizza", "Premium without Ethanol",
                      "Video Rentals", "Open 24hrs", "DEF", "Semi-Truck Fuel Island",
                      "Car Wash", "Seating", "Wi-Fi", "Clean Water"].map((service) => (
                        <Box gridColumn="span 4">
                          <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox onChange={(e) => handleOnChange(e)} name={service} />
                                }
                                label={service}
                              />
                            </FormGroup>
                          </FormControl>
                        </Box>
                      ))}
                  </Box>
                </CardContent>
              </Card>
            </div>
          </Box>
        </Box>
      </Container>

      <Container className="px-5 pt-4" style={{ height: 430, backgroundColor: '#f5f3f0' }} fluid>
        <div className="border">
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
            <Box gridColumn="span 3">
              {entities.map((store) => (
                <>
                  <div className="fw-bold text-danger">{store.name}</div>
                  <div className="f-small">
                    {store.address} <br />
                    {store.city}, {store.zip} <br />
                    {store.state}
                  </div>
                  <table>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Store: </td>
                      <td>{store.storePhone}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Kitchen: </td>
                      <td>{store.kitchenPhone}</td>
                    </tr>
                  </table>

                  <div>
                    <a href={"/store/" + store.id}>MORE DETAILS</a>
                  </div>
                  <hr style={{ margin: 0 }} />
                </>
              ))}
            </Box>
            <Box gridColumn="span 9">
              <img src="/img/map.png" style={{ height: 400, width: 950 }} alt="food1" />
            </Box>
          </Box>
        </div>
      </Container>
    </>
  )
}

export default FindStore;
