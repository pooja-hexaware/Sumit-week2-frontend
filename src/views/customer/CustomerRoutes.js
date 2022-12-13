import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const CustomerList = Loadable(lazy(() => import('./CustomerList')))
const EditCustomer = Loadable(lazy(() => import('./EditCustomer')))
const AddCustomer = Loadable(lazy(() => import('./AddCustomer')))

const customerRoutes = [
    {
        path: '/customer',
        element: <CustomerList />,
    },
    {
        path: '/customer/edit/:id',
        element: <EditCustomer />,
    },
    {
        path: '/customer/add',
        element: <AddCustomer />,
    },
]

export default customerRoutes
