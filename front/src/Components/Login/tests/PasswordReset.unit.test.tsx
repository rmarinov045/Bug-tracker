import PasswordReset from "../PasswordReset";
import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from '../../../store'

const Wrapper = ({ children }: any) => {
    return <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/admin"></Route>
                <Route path="/" element={children}></Route>
            </Routes>
        </BrowserRouter>
    </Provider>
}

let mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockUseNavigate,
}))

let mockSendVerification = jest.fn()

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' },
        reload: jest.fn,
    }
})

jest.mock('firebase/auth', () => {
    return {
        sendPasswordResetEmail: () => mockSendVerification
    }
})

describe('Password reset component unit tests', () => {

    beforeEach(() => mockSendVerification.mockResolvedValue(true))

    afterEach(cleanup)

    it('renders without errors', () => {
        render(<PasswordReset />, { wrapper: Wrapper })
        expect(screen.getByText('Please enter your email')).toBeInTheDocument()
    })
    it('shows error if input is empty', async () => {
        render(<PasswordReset />, { wrapper: Wrapper })
        fireEvent.click(screen.getByRole('button'))

        expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument()
    })
    it('sends email if email is specified and valid', async () => {
        render(<PasswordReset />, { wrapper: Wrapper })
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@test.bg '} })

        fireEvent.click(screen.getByRole('button'))

        expect(await screen.findByText('Please check your inbox for more information. You will be redirected to login in 5 seconds.')).toBeInTheDocument()
    })
})