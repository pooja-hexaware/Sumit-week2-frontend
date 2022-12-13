const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import OrderList from '../OrderList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Order rows when api response has data', async () => {
    const endPoint = 'order'
    const getOrderListResponse = [
        {
            id: 1,
            orderDate: 'orderDate1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getOrderListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <OrderList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const orderOrderDateCell = await screen.findByText(/orderDate1/i)

    expect(orderOrderDateCell).toHaveTextContent(/orderDate1/i)
    mock.reset()
})
