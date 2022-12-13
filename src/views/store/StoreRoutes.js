import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const StoreList = Loadable(lazy(() => import('./StoreList')));
const EditStore = Loadable(lazy(() => import('./EditStore')));
const AddStore = Loadable(lazy(() => import('./AddStore')));
const FindStore = Loadable(lazy(() => import('./FindStore')));
const MenuListByStore = Loadable(lazy(() => import('./MenuListByStore')))
const Checkout = Loadable(lazy(() => import('../store/Checkout')))

const storeRoutes = [
    {
        path: '/checkout',
        element: <Checkout />,
    },
    {
        path: '/find-a-store',
        element: <FindStore />,
    },
    {
        path: '/store/:id',
        element: <MenuListByStore />,
    },
    {
        path: '/store',
        element: <StoreList />,
    },
    {
        path: '/store/edit/:id',
        element: <EditStore />,
    },
    {
        path: '/store/add',
        element: <AddStore />,
    },
]

export default storeRoutes
