import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editMenu } from './store/menu.action'
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

const EditMenu = () => {
    const { id: menuId } = useParams()

    const menu = useSelector((state) =>
        state.menu.entities.find(
            (menu) => menu.id.toString() === menuId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(menu.name)
    const [description, setDescription] = useState(menu.description)
    const [amount, setAmount] = useState(menu.amount)
    const [quantity, setQuantity] = useState(menu.quantity)

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleAmount = (e) => setAmount(e.target.value)
    const handleQuantity = (e) => setQuantity(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editMenu({
                id: menuId,
                name,
                description,
                amount,
                quantity,
            })
        )
        navigate('/menu')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditMenu', path: '/menu' },
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
                                name="description"
                                id="descriptionInput"
                                onChange={handleDescription}
                                value={description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="amount"
                                id="amountInput"
                                onChange={handleAmount}
                                value={amount}
                                validators={['required']}
                                label="Amount"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="quantity"
                                id="quantityInput"
                                onChange={handleQuantity}
                                value={quantity}
                                validators={['required']}
                                label="Quantity"
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

export default EditMenu
