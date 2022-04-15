import * as reducer from './projectReducer'

const mockProject = { name: 'test', id: '1' }

jest.mock('../api/projectService', () => {
    return {
        createProjectInDb: { name: 'test', id: '1' },
        deleteProject: true,
        getProjectsFromDb: [{'id': { name: 'test', id: '1' }}],
    }
})

const initialState = { list: [], loaded: false }

const initialStateWithProjects = { list: [mockProject], loaded: false }

describe('createProject extra reducer unit tests', () => {
    it('Should add project to state projects array', async () => {
        const action = { type: reducer.createProject.fulfilled, payload: mockProject}
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ list: [mockProject], loaded: true })
    })
    it('Should set loaded to false while pending', async () => {
        const action = { type: reducer.createProject.pending, payload: 'test'}
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ list: [], loaded: false })
    })
})

describe('getProjects extra reducer unit tests', () => {
    it('Should add fetched projects to state array if fullfilled', async () => {
        const action = { type: reducer.getProjects.fulfilled, payload: { 'id': mockProject }}
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ list: [mockProject], loaded: true })
    })
    it('Should set loaded to false if pending', async () => {
        const action = { type: reducer.getProjects.pending, payload: { 'id': mockProject }}
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ list: [], loaded: false })
    })
    it('Should reset projects list to empty array if rejected', async () => {
        const action = { type: reducer.getProjects.rejected, payload: { 'id': mockProject }}
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ list: [], loaded: true })
    })
})

describe('Delete project by id extra reducer unit test', () => {
    it('Should remove project from state list if fullfiled', async () => {
        const action = { type: reducer.deleteProjectById.fulfilled, payload: '1'}
        const state = reducer.default(initialStateWithProjects, action)

        expect(state).toEqual({ list: [], loaded: true })
    })
    it('Should set loaded to false if pending', async () => {
        const action = { type: reducer.deleteProjectById.pending, payload: '1'}
        const state = reducer.default(initialStateWithProjects, action)

        expect(state).toEqual({ list: [mockProject], loaded: false })
    })
})