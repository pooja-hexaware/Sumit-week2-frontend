const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddStoremenu from '../AddStoremenu'

beforeEach(() => {
    const endPoint = 'storemenu'
    const getStudentListResponse = [
        {
            id: 1,
            storeId: 'storeId',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddStoremenu />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view StoremenuAdd Component', () => {
    test('should render AddStoremenu and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addStoremenuButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const storeIdElement = screen.getByLabelText(/StoreId/i)

        expect(addStoremenuButtonElement).toBeInTheDocument()

        expect(storeIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Storemenu add form', async () => {
        const storeIdElement = screen.getByLabelText(/StoreId/i)

        fireEvent.change(storeIdElement, { target: { value: 'storeId' } })
    })

    test('should return error message when add Storemenu button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addStoremenuButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addStoremenuButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(1)
    })
})
