import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editCustomer } from './store/customer.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

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

const EditCustomer = () => {
    const { id: customerId } = useParams()

    const customer = useSelector((state) =>
        state.customer.entities.find(
            (customer) => customer.id.toString() === customerId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(customer.name)
    const [postalcode, setPostalcode] = useState(customer.postalcode)
    const [city, setCity] = useState(customer.city)

    const handleName = (e) => setName(e.target.value)
    const handlePostalcode = (e) => setPostalcode(e.target.value)
    const handleCity = (e) => setCity(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editCustomer({
                id: customerId,
                name,
                postalcode,
                city,
            })
        )
        navigate('/customer')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditCustomer', path: '/customer' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
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
                                name="postalcode"
                                id="postalcodeInput"
                                onChange={handlePostalcode}
                                value={postalcode}
                                validators={['required']}
                                label="Postalcode"
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
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditCustomer
