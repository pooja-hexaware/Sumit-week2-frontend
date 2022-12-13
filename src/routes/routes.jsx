import NotFound from 'views/sessions/NotFound'
import orderRoutes from 'views/order/OrderRoutes'
import storemenuRoutes from 'views/storemenu/StoremenuRoutes'
import menuRoutes from 'views/menu/MenuRoutes'
import allowedtoppingsRoutes from 'views/allowedtoppings/AllowedtoppingsRoutes'
import customerRoutes from 'views/customer/CustomerRoutes'
import storeRoutes from 'views/store/StoreRoutes'
import facilitiesRoutes from 'views/facilities/FacilitiesRoutes'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [
                ...homeRoutes,
                ...facilitiesRoutes,
                ...storeRoutes,
                ...customerRoutes,
                ...allowedtoppingsRoutes,
                ...menuRoutes,
                ...storemenuRoutes,
                ...orderRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
