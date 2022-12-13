import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addStore } from './store/store.action'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AddStore = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [stateName, setStateName] = useState('')
    const [storePhone, setStorePhone] = useState('')
    const [kitchenPhone, setKitchenPhone] = useState('')
    const [isActive, setIsActive] = useState('')

    const handleName = (e) => setName(e.target.value)
    const handleAddress = (e) => setAddress(e.target.value)
    const handleZip = (e) => setZip(e.target.value)
    const handleCity = (e) => setCity(e.target.value)
    const handleStateName = (e) => setStateName(e.target.value)
    const handleStorePhone = (e) => setStorePhone(e.target.value)
    const handleKitchenPhone = (e) => setKitchenPhone(e.target.value)
    const handleIsActive = (e) => setIsActive(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addStore({
                name,
                address,
                zip,
                city,
                stateName,
                storePhone,
                kitchenPhone,
                isActive,
            })
        )
        navigate('/store')
    }

    useEffect(() => {
        return () => {
            setName('')
            setAddress('')
            setZip('')
            setCity('')
            setStateName('')
            setStorePhone('')
            setKitchenPhone('')
            setIsActive('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddStore', path: '/store' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="address"
                                id="addressInput"
                                onChange={handleAddress}
                                value={address}
                                validators={['required']}
                                label="Address"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="zip"
                                id="zipInput"
                                onChange={handleZip}
                                value={zip}
                                validators={['required']}
                                label="Zip"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="city"
                                id="cityInput"
                                onChange={handleCity}
                                value={city}
                                validators={['required']}
                                label="City"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="stateName"
                                id="stateNameInput"
                                onChange={handleStateName}
                                value={stateName}
                                validators={['required']}
                                label="State"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="storePhone"
                                id="storePhoneInput"
                                onChange={handleStorePhone}
                                value={storePhone}
                                validators={['required']}
                                label="StorePhone"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="kitchenPhone"
                                id="kitchenPhoneInput"
                                onChange={handleKitchenPhone}
                                value={kitchenPhone}
                                validators={['required']}
                                label="KitchenPhone"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={isActive}
                                onChange={handleIsActive}
                                select
                                id="isActiveInput"
                                label="IsActive"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddStore
