import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const MenuList = Loadable(lazy(() => import('./MenuList')))
const EditMenu = Loadable(lazy(() => import('./EditMenu')))
const AddMenu = Loadable(lazy(() => import('./AddMenu')))

const menuRoutes = [
    {
        path: '/menu',
        element: <MenuList />,
    },

    {
        path: '/menu/edit/:id',
        element: <EditMenu />,
    },
    {
        path: '/menu/add',
        element: <AddMenu />,
    },
]

export default menuRoutes
