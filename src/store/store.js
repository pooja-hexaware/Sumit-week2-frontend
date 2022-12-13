import { configureStore } from '@reduxjs/toolkit'
import orderReducer from '../views/order/store/orderSlice'
import storemenuReducer from '../views/storemenu/store/storemenuSlice'
import menuReducer from '../views/menu/store/menuSlice'
import allowedtoppingsReducer from '../views/allowedtoppings/store/allowedtoppingsSlice'
import customerReducer from '../views/customer/store/customerSlice'
import storeReducer from '../views/store/store/storeSlice'
import facilitiesReducer from '../views/facilities/store/facilitiesSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        facilities: facilitiesReducer,
        store: storeReducer,
        customer: customerReducer,
        allowedtoppings: allowedtoppingsReducer,
        menu: menuReducer,
        storemenu: storemenuReducer,
        order: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
