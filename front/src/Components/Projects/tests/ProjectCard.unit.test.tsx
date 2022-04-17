/* eslint-disable testing-library/no-node-access */
import ProjectCard from "../ProjectCard";
import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
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

let mockDispatch = jest.fn()

jest.mock('../../../store', () => {
    return {
        ...jest.requireActual('../../../store'),
        useAppDispatch: () => mockDispatch
    }
}
)

const mockProject = { name: 'test', id: '1' }
const mockHandleOpen = jest.fn()
let mockCurrentProject
const mockSetModalMessage = jest.fn()
const mockSetModalColor = jest.fn()

describe('Project card unit tests', () => {

    afterEach(cleanup)

    it('renders without errors', () => {
        mockCurrentProject = { name: 'test2', id: '2' }
        render(<ProjectCard project={mockProject} currentProject={mockCurrentProject} handleOpen={mockHandleOpen} setModalColor={mockSetModalColor} setModalMessage={mockSetModalMessage} />, { wrapper: Wrapper })
        expect(screen.getByText('test')).toBeInTheDocument()
    })
    it('calls handleOpen when clicking the button', () => {
        mockCurrentProject = { name: 'test2', id: '2' }
        render(<ProjectCard project={mockProject} currentProject={mockCurrentProject} handleOpen={mockHandleOpen} setModalColor={mockSetModalColor} setModalMessage={mockSetModalMessage} />, { wrapper: Wrapper })
        fireEvent.click(document.querySelectorAll('svg')[0])
        expect(mockHandleOpen).toBeCalled()
    })
    it('handles delete when clicking delete button', () => {
        mockCurrentProject = { name: 'test2', id: '2' }
        render(<ProjectCard project={mockProject} currentProject={mockCurrentProject} handleOpen={mockHandleOpen} setModalColor={mockSetModalColor} setModalMessage={mockSetModalMessage} />, { wrapper: Wrapper })
        fireEvent.click(document.querySelectorAll('svg')[1])
        expect(mockDispatch).toBeCalled()
    })
    it('Does not render open button on current project', () => {
        mockCurrentProject = { name: 'test2', id: '1' }
        render(<ProjectCard project={mockProject} currentProject={mockCurrentProject} handleOpen={mockHandleOpen} setModalColor={mockSetModalColor} setModalMessage={mockSetModalMessage} />, { wrapper: Wrapper })
        expect(document.querySelectorAll('svg')[1]).toBeUndefined()
    })
})