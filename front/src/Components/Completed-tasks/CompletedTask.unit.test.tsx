import React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import CompletedTask from './CompletedTask'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from '../../store'

const task = { taskName: 'testName', authorId: '1', id: '2', project: 'default', taskAuthor: 'testAuthor', taskDescription: 'testDesc', taskPriority: 'High', taskType: 'Major Bug', completedOn: '3' }

const Wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
}

jest.mock('../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

describe('Completed task component unit test', () => {

    it('Should render with passed task prop', async() => {
        render(<CompletedTask task={task} />, { wrapper: Wrapper })
        expect(await screen.findByText('testName')).toBeInTheDocument()
    })
    it('Should should details on click', async () => {
        render(<CompletedTask task={task} />, { wrapper: Wrapper })
        fireEvent.click(await screen.findByText('testName'))
        expect(await screen.findByText('Creator:')).toBeInTheDocument()
    })
    it('Should render creator image', async () => {
        render(<CompletedTask task={task} />, { wrapper: Wrapper })
        fireEvent.click(await screen.findByText('testName'))
        expect(await screen.findByRole('img')).toBeInTheDocument()
    })
})