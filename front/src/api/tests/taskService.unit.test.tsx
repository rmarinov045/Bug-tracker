import axios from 'axios'
import * as taskService from '../taskService'

const task = { taskName: 'testName', authorId: '1', id: '2', project: 'default', taskAuthor: 'testAuthor', taskDescription: 'testDesc', taskPriority: 'High', taskType: 'Major Bug', completedOn: '3' }

jest.mock('../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

jest.mock("axios")

describe('createTask unit tests', () => {


    it('Returns true upon successful api request', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 200 })
        expect(await taskService.createTask(task)).toEqual(true)
    })
    it('Returns a message upon failure', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 199 })

        expect(await taskService.createTask(task)).toEqual('Failed to create task')
    })
})

describe('getAllTasks unit tests', () => {


    it('Returns an array of tasks if successful', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { test: task }, status: 200 })

        expect(await taskService.getAllTasks('1')).toEqual([task])
    })
    it('Returns null if error', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { test: task }, status: 199 })
        expect(await taskService.getAllTasks('1')).toEqual(null)
    })
})

describe('deleteTask unit tests', () => {


    it('Returns success message on deletion', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { test: task }, status: 200 })
        axios.delete = jest.fn().mockReturnValue({ data: { test: task }, status: 200 })

        expect(await taskService.deleteTask('3')).toEqual({ status: 'ok', message: 'Task Deleted' })
    })
    it('Returns error object on fail', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { test: task }, status: 200 })
        axios.delete = jest.fn().mockReturnValue({ data: { test: task }, status: 199 })

        expect(await taskService.deleteTask('3')).toEqual({ status: 'failed', message: 'Failed to delete task, please try again later' })
    })
})

describe('Complete task unit tests', () => {
    it('Return object on success', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 200 })
        expect(await taskService.completeTask(task)).toEqual({ status: 'ok', message: 'Task Completed' })
    })
    it('Throws error and returns error message if request failed', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 199 })
        expect(await taskService.completeTask(task)).toEqual('Failed to move task to completed')
    })
})

describe('Get completed tasks unit tests', () => {
    it('Return completed tasks on success', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { test: task }, status: 200 })
        expect(await taskService.getAllCompletedTasksByIdAndProject('1', '1')).toEqual([])
    })
    it('Throws error if request failed', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 199 })
        expect(await taskService.getAllCompletedTasksByIdAndProject('1', '1')).toEqual('Could not fetch tasks.')
    })
})

describe('Edit task unit test', () => {
    it('Return edited task on success', async () => {
        axios.put = jest.fn().mockResolvedValue({ data: { test: task }, status: 200 })
        expect(await taskService.editTask(task)).toEqual({'test': task})
    })
    it('Throws error if request failed', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 199 })
        expect(await taskService.getAllCompletedTasksByIdAndProject('1', '1')).toEqual('Could not fetch tasks.')
    })
})

describe('Get task by db id unit test', () => {
    it('Return id on success', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { id: 'id' }, status: 200 })
        expect(await taskService.getTaskById('3')).toEqual('id')
    })
    it('Throws error if request failed', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 199 })
        expect(await taskService.getTaskById('2')).toEqual('Could not find task')
    })
})