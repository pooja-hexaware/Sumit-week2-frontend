const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import AllowedtoppingsList from '../AllowedtoppingsList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Allowedtoppings rows when api response has data', async () => {
    const endPoint = 'allowedtoppings'
    const getAllowedtoppingsListResponse = [
        {
            id: 1,
            name: 'name1',
            price: 'price1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getAllowedtoppingsListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AllowedtoppingsList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const allowedtoppingsNameCell = await screen.findByText(/name1/i)

    expect(allowedtoppingsNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
