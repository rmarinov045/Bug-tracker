/* eslint-disable testing-library/no-unnecessary-act */
import ProfileFull from "../ProfileFull";
import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from '../../../store'
import * as redux from 'react-redux'
import * as user from '../../../features/userReducer'
import TestRenderer from "react-test-renderer";

const { act } =TestRenderer

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

jest.mock('../../../auth/auth', () => {
    return {
        resetPassword: (data: any) => jest.fn().mockReturnValue(true)
    }
})

jest.mock('../../../store', () => {
    return {
        ...jest.requireActual('../../../store'),
        useAppDispatch: () => jest.fn().mockReturnValue({ unwrap: jest.fn().mockResolvedValue(true) })
    }
})

const spyOnDeleteUserPic = jest.spyOn(user, 'deleteUserProfilePic')
const spyOnUpdateUserById = jest.spyOn(user, 'updateUserById')

const spyOnUseSelector = jest.spyOn(redux, 'useSelector')

let mockUpdateModal = jest.fn()

const mockUser = { firstName: 'test', lastName: 'test last', position: 'testPosition', company: 'testCo', email: 'testMail' }

describe('Profile full unit tests', () => {
    beforeEach(() => spyOnUseSelector.mockReturnValue('test'))
    beforeEach(() => spyOnDeleteUserPic.mockImplementation(() => jest.fn()))
    beforeEach(() => spyOnUpdateUserById.mockImplementation(() => jest.fn()))

    afterEach(cleanup)

    it('Renders without errors', () => {
        render(<ProfileFull updateModal={jest.fn} user={mockUser} />, { wrapper: Wrapper })
        expect(screen.getAllByRole('textbox')[2]).toHaveValue('testCo')
    })
    it('Renders update user button', () => {
        render(<ProfileFull updateModal={jest.fn} user={mockUser} />, { wrapper: Wrapper })
        expect(screen.getAllByRole('button')[1]).toHaveTextContent('Update')
    })
    it('Renders reset password button', () => {
        render(<ProfileFull updateModal={jest.fn} user={mockUser} />, { wrapper: Wrapper })
        expect(screen.getAllByRole('button')[2]).toHaveTextContent('Reset')
    })
    it('Renders remove profile pic button', () => {
        render(<ProfileFull updateModal={jest.fn} user={mockUser} />, { wrapper: Wrapper })
        expect(screen.getAllByRole('button')[0]).toHaveTextContent('Remove')
    })
    it('Calls dispatch when clicking update user button', async () => {
        let mockSetLoading = jest.fn()
        React.useState = jest.fn().mockImplementationOnce((x: any) => [x, mockSetLoading])
        render(<ProfileFull updateModal={mockUpdateModal} user={mockUser} />, { wrapper: Wrapper })
        await act(async () => {
            fireEvent.click(screen.getAllByRole('button')[1])
            await waitFor(() => 500)
        })
        expect(mockUpdateModal).toBeCalled()
    })
    it('calls dispatch when clicking reset password button', async () => {
        let mockSetLoading = jest.fn()
        React.useState = jest.fn().mockImplementationOnce((x: any) => [x, mockSetLoading])
        render(<ProfileFull updateModal={mockUpdateModal} user={mockUser} />, { wrapper: Wrapper })
        await act(async () => {
            fireEvent.click(screen.getAllByRole('button')[2])
            await waitFor(() => 500)
        })
        expect(mockUpdateModal).toBeCalled()
    })
})