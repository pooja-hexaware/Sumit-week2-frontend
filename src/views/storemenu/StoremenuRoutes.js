import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const StoremenuList = Loadable(lazy(() => import('./StoremenuList')))
const EditStoremenu = Loadable(lazy(() => import('./EditStoremenu')))
const AddStoremenu = Loadable(lazy(() => import('./AddStoremenu')))

const storemenuRoutes = [
    {
        path: '/storemenu',
        element: <StoremenuList />,
    },
    {
        path: '/storemenu/edit/:id',
        element: <EditStoremenu />,
    },
    {
        path: '/storemenu/add',
        element: <AddStoremenu />,
    },
]

export default storemenuRoutes
