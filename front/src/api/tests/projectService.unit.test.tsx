import axios from 'axios'
import * as project from '../projectService'

jest.mock('../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

const mockProject = { name: 'test', id: '1' }

describe('Get current project DB ID unit tests', () => {
    it('returns id on success', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 200, data: { 'test': 'id' } })
        expect(await project.getCurrentProjectDbId('3')).toEqual('test')
    })
    it('Returns error message on error', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 199, data: { 'test': 'id', message: 'error' } })
        expect(await project.getCurrentProjectDbId('3')).toEqual('error')
    })
})

describe('Create project in db unit tests', () => {
    it('returns object with name and id on success', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 200, data: { 'test': 'id' } })
        expect(await project.createProjectInDb('name')).toEqual({ name: 'name', id: (Date.now()).toString() })
    })
    it('Returns error message on error', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 199, data: { 'test': 'id', message: 'error' } })
        expect(await project.createProjectInDb('name')).toEqual('error')
    })
})

describe('Get projects from db unit tests', () => {
    it('returns array of projects success', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 200, data: [mockProject] })
        expect(await project.getProjectsFromDb()).toEqual([mockProject])
    })
    it('Returns error message on error', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 199, data: { 'test': 'id', message: 'error' } })
        expect(await project.getProjectsFromDb()).toEqual('error')
    })
})

describe('Delete project from db unit tests', () => {
    it('returns response object on success', async () => {
        axios.delete = jest.fn().mockResolvedValue({ status: 200, data: [mockProject] })
        expect(await project.deleteProject('1')).toEqual({ data: [mockProject], status: 200 })
    })
    it('Returns error message on error', async () => {
        axios.delete = jest.fn().mockResolvedValue({ status: 199, data: { 'test': 'id', message: 'error' } })
        expect(await project.deleteProject('1')).toEqual('error')
    })
})

