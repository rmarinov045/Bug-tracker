import ConfirmEmail from "../ConfirmEmail";
import React from "react";
import { render, screen, cleanup } from '@testing-library/react'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from '../../../store'

const Wrapper = ({ children }: any) => {
    return <Provider store={store}>
        <MemoryRouter>
            <Routes>
                <Route path="/" element={children} />
            </Routes>
        </MemoryRouter>
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

let mockSendVerificationEmail = jest.fn()

jest.mock('../../../auth/auth', () => {
    return {
        ...jest.requireActual('../../../auth/auth'),
        sendVerificationEmail: () => mockSendVerificationEmail
    }
})

describe('Confirm email component unit tests', () => {

    afterEach(cleanup)

    it('renders without errors', () => {
        render(<ConfirmEmail />, { wrapper: Wrapper })
        expect(screen.getByText('Thank you for taking part!')).toBeInTheDocument()
    })
    it('renders link to login page', () => {
        render(<ConfirmEmail />, { wrapper: Wrapper })
        expect(screen.getByRole('link')).toBeInTheDocument()
    })
    it.skip('sends verification email on load if it is not sent', async () => {
        render(<ConfirmEmail />, { wrapper: Wrapper })
        expect(mockSendVerificationEmail).toHaveBeenCalled()
    })
})