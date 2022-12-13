import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const FacilitiesList = Loadable(lazy(() => import('./FacilitiesList')))
const EditFacilities = Loadable(lazy(() => import('./EditFacilities')))
const AddFacilities = Loadable(lazy(() => import('./AddFacilities')))

const facilitiesRoutes = [
    {
        path: '/facilities',
        element: <FacilitiesList />,
    },
    {
        path: '/facilities/edit/:id',
        element: <EditFacilities />,
    },
    {
        path: '/facilities/add',
        element: <AddFacilities />,
    },
]

export default facilitiesRoutes
