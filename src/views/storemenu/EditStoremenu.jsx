import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editStoremenu } from './store/storemenu.action'
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

const EditStoremenu = () => {
    const { id: storemenuId } = useParams()

    const storemenu = useSelector((state) =>
        state.storemenu.entities.find(
            (storemenu) => storemenu.id.toString() === storemenuId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [storeId, setStoreId] = useState(storemenu.storeId)

    const handleStoreId = (e) => setStoreId(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editStoremenu({
                id: storemenuId,
                storeId,
            })
        )
        navigate('/storemenu')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditStoremenu', path: '/storemenu' },
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
                                name="storeId"
                                id="storeIdInput"
                                onChange={handleStoreId}
                                value={storeId}
                                validators={['required']}
                                label="StoreId"
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

export default EditStoremenu
