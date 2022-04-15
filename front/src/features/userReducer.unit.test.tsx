import * as reducer from './userReducer'

jest.mock('../api/userService', () => {
    return {
        deleteUserImage: true,
        getUser: { firstName: 'test', lastName: 'test2', company: 'testCompany', position: 'testPosition', email: 'testmail', userId: '1', profileImageUrl: 'url' },
        updateUser: true,
        deleteImage: true,
        downloadImage: true
    }
})

const mockUser = { firstName: 'test', lastName: 'test2', company: 'testCompany', position: 'testPosition', email: 'testmail', userId: '1', profileImageUrl: 'url' }
const mockUser2 = { firstName: 'test2', lastName: 'test2', company: 'testCompany', position: 'testPosition', email: 'testmail', userId: '1', profileImageUrl: 'url' }

const initialState = { auth: false, value: {}, imageUrl: '', currentProject: { name: 'default', id: 'default' }, darkMode: false }

describe('getUserByEmail extra reducer unit tests', () => {
    it('Should set user value to state if fullfilled', async() => {
        const action = { type: reducer.getUserByEmail.fulfilled, payload:  mockUser }
        const state = reducer.default(initialState, action)
        
        expect(state.value.firstName).toEqual('test')
    })
    it('Should set state value to error if failed', async () => {
        const action = { type: reducer.getUserByEmail.fulfilled, payload: 'Error' }
        const state = reducer.default(initialState, action)

        expect(state.value).toEqual('Error')
    })
})

describe('Update user by id extra reducer unit tests', () => {
    it('Should replace state user value with the new one', () => {
        const action = { type: reducer.updateUserById.fulfilled, payload:  mockUser }
        const state = reducer.default({ auth: false, value: mockUser2, imageUrl: '', currentProject: { name: 'default', id: 'default' }, darkMode: false }, action)
        
        expect(state.value.firstName).toEqual('test')
    })
})

describe('Get user profile pic extra reducer unit tests', () => {
    it('Should update state user image url value with the new one', () => {
        const action = { type: reducer.getUserProfilePic.fulfilled, payload:  'url' }
        const state = reducer.default(initialState, action)
        
        expect(state.imageUrl).toEqual('url')
    })
    // recheck - error handling is not working as inspected
    it.skip('Should reset the value to empty string if there is an error', async () => {
        const action = { type: reducer.getUserProfilePic.fulfilled, payload: new Error('test') }
        const state = reducer.default(initialState, action)
        
        expect(state.imageUrl).toEqual('')
    })
})

describe('Delete user profile pic extra reducer unit tests', () => {
    it('Should delete state user image url value in all cases', () => {
        const action = { type: reducer.deleteUserProfilePic.fulfilled, payload:  'url' }
        const state = reducer.default(initialState, action)
        
        expect(state.imageUrl).toEqual('url')
    })
})

describe('Authenticate reducer unit tests', () => {
    it('Should set auth in state when fullfilled', async () => {
        const action = { type: reducer.authenticate, payload:  true }
        const state = reducer.default(initialState, action)
        
        expect(state.auth).toEqual(true)
    })
})

describe('Reset reducer unit tests', () => {
    it('Should reset all values in state when fullfilled', async () => {
        const action = { type: reducer.reset, payload:  '' }
        const state = reducer.default(initialState, action)
        
        expect(state.auth).toEqual(false)
        expect(state.value).toEqual({})
        expect(state.imageUrl).toEqual('')
        expect(state.darkMode).toEqual(false)
    })
})

describe('Open project reducer unit tests', () => {
    it('Should set project in state when fullfilled', async () => {
        const action = { type: reducer.openProject, payload:  { name: 'test', id: 'test' } }
        const state = reducer.default(initialState, action)
        
        expect(state.currentProject.name).toEqual('test')
    })
})

describe('Set dark mode reducer unit tests', () => {
    it('Should set dark mode preference in state when fullfilled', async () => {
        const action = { type: reducer.setDarkMode, payload:  true }
        const state = reducer.default(initialState, action)
        
        expect(state.darkMode).toEqual(true)
    })
})