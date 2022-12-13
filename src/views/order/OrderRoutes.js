import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const OrderList = Loadable(lazy(() => import('./OrderList')))
const EditOrder = Loadable(lazy(() => import('./EditOrder')))
const AddOrder = Loadable(lazy(() => import('./AddOrder')))

const orderRoutes = [
    {
        path: '/order',
        element: <OrderList />,
    },
    {
        path: '/order/edit/:id',
        element: <EditOrder />,
    },
    {
        path: '/order/add',
        element: <AddOrder />,
    },
]

export default orderRoutes
