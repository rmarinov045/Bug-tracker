import React from "react";
import { render, screen, cleanup } from '@testing-library/react'
import TaskContainer from './TaskContainer'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from '../../store'

const tasks = [
    { taskName: 'ABCD', authorId: '2', id: '3', project: 'default', taskAuthor: 'testAuthor2', taskDescription: 'testDesc2', taskPriority: 'Low', taskType: 'Minor Bug', completedOn: '4' },
    { taskName: 'XYZ', authorId: '2', id: '3', project: 'default', taskAuthor: 'testAuthor2', taskDescription: 'testDesc2', taskPriority: 'Low', taskType: 'Minor Bug', completedOn: '4' }
]

jest.mock('../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

const Wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
}

describe('Task Container unit tests', () => {
    afterEach(cleanup)

    it('Renders tasks without errors', async () => {
        render(<TaskContainer tasks={tasks} tasksLoaded={true} updateModalColor={jest.fn} updateModalMessage={jest.fn} />, { wrapper: Wrapper })
        expect(screen.getByText(/XYZ/i)).toBeInTheDocument()
    })
    it('Renders placeholder message when there are no tasks', async () => {
        render(<TaskContainer tasks={[]} tasksLoaded={true} updateModalColor={jest.fn} updateModalMessage={jest.fn} />, { wrapper: Wrapper })
        expect(screen.getByText(/Such empty/i)).toBeInTheDocument()
    })
    it('Renders spinner if tasks have not loaded yet', async () => {
        render(<TaskContainer tasks={tasks} tasksLoaded={false} updateModalColor={jest.fn} updateModalMessage={jest.fn} />, { wrapper: Wrapper })
        expect(screen.queryByText(/XYZ/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Such/i)).not.toBeInTheDocument()
    })
})