const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import StoremenuList from '../StoremenuList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Storemenu rows when api response has data', async () => {
    const endPoint = 'storemenu'
    const getStoremenuListResponse = [
        {
            id: 1,
            storeId: 'storeId1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStoremenuListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <StoremenuList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const storemenuStoreIdCell = await screen.findByText(/storeId1/i)

    expect(storemenuStoreIdCell).toHaveTextContent(/storeId1/i)
    mock.reset()
})
