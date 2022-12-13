const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import CustomerList from '../CustomerList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Customer rows when api response has data', async () => {
    const endPoint = 'customer'
    const getCustomerListResponse = [
        {
            id: 1,
            name: 'name1',
            postalcode: 'postalcode1',
            city: 'city1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getCustomerListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <CustomerList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const customerNameCell = await screen.findByText(/name1/i)

    expect(customerNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
