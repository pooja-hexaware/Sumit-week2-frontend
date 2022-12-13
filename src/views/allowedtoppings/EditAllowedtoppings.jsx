import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editAllowedtoppings } from './store/allowedtoppings.action'
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

const EditAllowedtoppings = () => {
    const { id: allowedtoppingsId } = useParams()

    const allowedtoppings = useSelector((state) =>
        state.allowedtoppings.entities.find(
            (allowedtoppings) =>
                allowedtoppings.id.toString() === allowedtoppingsId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(allowedtoppings.name)
    const [price, setPrice] = useState(allowedtoppings.price)

    const handleName = (e) => setName(e.target.value)
    const handlePrice = (e) => setPrice(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editAllowedtoppings({
                id: allowedtoppingsId,
                name,
                price,
            })
        )
        navigate('/allowedtoppings')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        {
                            name: 'EditAllowedtoppings',
                            path: '/allowedtoppings',
                        },
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
                                name="price"
                                id="priceInput"
                                onChange={handlePrice}
                                value={price}
                                validators={['required']}
                                label="Price"
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

export default EditAllowedtoppings
