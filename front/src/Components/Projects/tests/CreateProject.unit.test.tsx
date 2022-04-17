/* eslint-disable testing-library/no-unnecessary-act */
import CreateProject from "../CreateProject";
import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from '../../../store'
import { act } from "react-test-renderer";

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

jest.mock('../../../store', () => {
    return {
        ...jest.requireActual('../../../store'),
        useAppDispatch: () => jest.fn().mockImplementation(() => {
            return { unwrap: jest.fn().mockResolvedValue(true) }
        })
    }
})

let mockCreateProject = jest.fn()
let mockVisible = jest.fn((x: any) => null)
let mockUpdateModalColor = jest.fn()
let mockUpdateModalMessage = jest.fn()

jest.mock('../../../features/projectReducer', () => {
    return {
        ...jest.requireActual('../../../features/projectReducer'),
        createProject: () => mockCreateProject
    }
})

describe('Create project unit tests', () => {

    afterEach(cleanup)

    it('renders without errors', () => {
        render(<CreateProject visible={mockVisible} setModalColor={mockUpdateModalColor} setModalMessage={mockUpdateModalMessage} />, { wrapper: Wrapper })
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
    it('calls error handler when input field is empty', () => {
        render(<CreateProject visible={mockVisible} setModalColor={mockUpdateModalColor} setModalMessage={mockUpdateModalMessage} />, { wrapper: Wrapper })
        fireEvent.click(screen.getByRole('button'))
        expect(mockUpdateModalColor).toBeCalled()
    })
    it('calls visibility controller if successful', async () => {
        render(<CreateProject visible={mockVisible} setModalColor={mockUpdateModalColor} setModalMessage={mockUpdateModalMessage} />, { wrapper: Wrapper })
        await act(async () => {
            fireEvent.focus(screen.getByRole('textbox'))
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } })
            fireEvent.click(screen.getByRole('button'))
            await waitFor(() => 500)
        })
        expect(mockVisible).toBeCalled()
    })
})