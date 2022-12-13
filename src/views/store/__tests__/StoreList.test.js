const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import StoreList from '../StoreList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Store rows when api response has data', async () => {
    const endPoint = 'store'
    const getStoreListResponse = [
        {
            id: 1,
            name: 'name1',
            address: 'address1',
            zip: 'zip1',
            city: 'city1',
            stateName: 'stateName1',
            storePhone: 'storePhone1',
            kitchenPhone: 'kitchenPhone1',
            isActive: true,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStoreListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <StoreList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const storeNameCell = await screen.findByText(/name1/i)

    expect(storeNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
