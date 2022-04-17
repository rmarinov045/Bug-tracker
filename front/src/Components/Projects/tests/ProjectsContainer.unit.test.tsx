import ProjectsContainer from "../ProjectsContainer";
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

let mockLoaded

const mockProject1 = { name: 'test', id: '1' }
const mockProject2 = { name: 'test2', id: '2' }

let mockProjects :any

describe('Projects container unit tests', () => {
    afterEach(cleanup)

    it('renders without errors', () => {
        mockLoaded = true
        mockProjects = [mockProject1, mockProject2]
        render(<ProjectsContainer projects={mockProjects} loaded={mockLoaded} />, { wrapper: Wrapper })
        expect(screen.getByText('test')).toBeInTheDocument()
    })
    it('renders default project', () => {
        mockLoaded = true
        mockProjects = []
        render(<ProjectsContainer projects={mockProjects} loaded={mockLoaded} />, { wrapper: Wrapper })
        expect(screen.getByText('Default')).toBeInTheDocument()
    })
    it('renders add project button', () => {
        mockLoaded = true
        mockProjects = []
        render(<ProjectsContainer projects={mockProjects} loaded={mockLoaded} />, { wrapper: Wrapper })
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })
    it('renders spinner if projects are not loaded', () => {
        mockLoaded = false
        mockProjects = [mockProject1]
        render(<ProjectsContainer projects={mockProjects} loaded={mockLoaded} />, { wrapper: Wrapper })
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })
    it('renders add project menu when clicking add project button', () => {
        mockLoaded = true
        mockProjects = []
        render(<ProjectsContainer projects={mockProjects} loaded={mockLoaded} />, { wrapper: Wrapper })
        fireEvent.click(screen.getAllByRole('listitem')[1])
        expect(screen.getByText('Create')).toBeInTheDocument()
    })
})