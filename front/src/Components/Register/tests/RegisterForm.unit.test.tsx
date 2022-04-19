/* eslint-disable testing-library/no-unnecessary-act */
import RegisterForm from "../RegisterForm";
import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from "react-redux";
import { store } from '../../../store'

const Wrapper = ({ children }: any) => {
    return <Provider store={store}>
        {children}
    </Provider>
}

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' },
        reload: jest.fn,
    }
})

let mockPostUser = jest.fn()

jest.mock('../../../api/userService', () => {
    return {
        ...jest.requireActual('../../../api/userService'),
        postUser: (email: any, password: any) => mockPostUser
    }
})

let mockRegisterUser = jest.fn()

jest.mock('../../../auth/auth', () => {
    return {
        ...jest.requireActual('../../../auth/auth'),
        registerUser: (data: any) => mockRegisterUser
    }
})

let mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }

})

describe('Register form unit tests', () => {

    beforeEach(() => jest.clearAllMocks())
    beforeEach(() => mockPostUser.mockResolvedValue(true))
    beforeEach(() => mockRegisterUser.mockResolvedValue(true))
    afterEach(cleanup)

    it('renders without errors', () => {
        render(<RegisterForm />, { wrapper: Wrapper })
        expect(screen.getByText('Sign up to signUM')).toBeInTheDocument()
    })
    it('does not post user if it fails validation', () => {
        render(<RegisterForm />, { wrapper: Wrapper })
        fireEvent.click(screen.getByRole('button'))
        expect(mockPostUser).toBeCalledTimes(0)
    })
    it('shows error if it fails password length validation', () => {
        render(<RegisterForm />, { wrapper: Wrapper })
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByText('Password should be at least 10 symbols')).toBeInTheDocument()
    })
    it('shows error if password and confirmation are not equal', () => {
        render(<RegisterForm />, { wrapper: Wrapper })
        fireEvent.change(screen.getByTestId('pass'), { target: { value: 'testtestte' } })
        fireEvent.change(screen.getByTestId('conf-pass'), { target: { value: 'testtestte2324234' } })
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByText('Passwords do not match!')).toBeInTheDocument()
    })
    it('posts user to db if input is valid', async () => {
        render(<RegisterForm />, { wrapper: Wrapper })

        fireEvent.change(await screen.findByTestId('email'), { target: { value: 'test@test.com' } })
        fireEvent.change(await screen.findByTestId('pass'), { target: { value: 'testtestte' } })
        fireEvent.change(await screen.findByTestId('conf-pass'), { target: { value: 'testtestte' } })

        fireEvent.submit(await screen.findByTestId('form'))

        await waitFor(() => {
            expect(mockNavigate).toBeCalled()
        })
    })
})

// needs error handling tests