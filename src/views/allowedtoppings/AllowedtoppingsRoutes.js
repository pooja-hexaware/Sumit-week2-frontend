import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const AllowedtoppingsList = Loadable(
    lazy(() => import('./AllowedtoppingsList'))
)
const EditAllowedtoppings = Loadable(
    lazy(() => import('./EditAllowedtoppings'))
)
const AddAllowedtoppings = Loadable(lazy(() => import('./AddAllowedtoppings')))

const allowedtoppingsRoutes = [
    {
        path: '/allowedtoppings',
        element: <AllowedtoppingsList />,
    },
    {
        path: '/allowedtoppings/edit/:id',
        element: <EditAllowedtoppings />,
    },
    {
        path: '/allowedtoppings/add',
        element: <AddAllowedtoppings />,
    },
]

export default allowedtoppingsRoutes
