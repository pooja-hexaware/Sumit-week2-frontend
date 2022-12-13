const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import FacilitiesList from '../FacilitiesList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Facilities rows when api response has data', async () => {
    const endPoint = 'facilities'
    const getFacilitiesListResponse = [
        {
            id: 1,
            name: 'name1',
            description: 'description1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getFacilitiesListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <FacilitiesList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const facilitiesNameCell = await screen.findByText(/name1/i)

    expect(facilitiesNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
