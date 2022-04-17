/* eslint-disable testing-library/await-async-utils */
const baseUrl = 'http://localhost:3000'

describe('Dashboard tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get('input').first().type('lorem@ipsum.com')
        cy.get('input').eq(1).type('123456')
        cy.get('button').click()
    })

    it('renders page with user\'s firstname', () => {
        cy.get('div').should('contain.text', 'Pesho')
    })
    it('renders tasks if there are any', () => {
        cy.get('div').should('contain.text', 'test')
    })
    it('renders navbar', () => {
        cy.get('nav').should('be.visible')
    })
    it('renders filter component', () => {
        cy.get('aside').should('be.visible')
    })
    it('renders search field', () => {
        cy.get('input').should('be.visible')
    })
    it('renders refresh button', () => {
        cy.get('.animate-spin').should('be.visible')
    })
    it('opens add task view when clicking on filter add button', () => {
        cy.get('aside > div').first().click()
        cy.get('div').should('contain.text', 'Create')
    })
    it('closes the add task modal when clicking the X button', () => {
        cy.get('aside > div').first().click()
        cy.get('#close-add-task').click()
        cy.get('div').should('not.contain.text', 'Create')
    })
    it('should show filters when clicking on the filter button', () => {
        cy.get('aside > div').first().next().click()
        cy.get('div').should('contain.text', 'Priority')
    })
    it('should filter by priority if clicked', async () => {
        cy.get('aside > div').first().next().click()
        cy.get('p').eq(2).click()

        cy.wait(2000)

        cy.get('#task-container').first().should('contain.text', 'Pesho')
    })
    it('should filter by type if clicked', async () => {
        cy.get('aside > div').first().next().click()
        cy.get('p').eq(3).click()

        cy.wait(2000)

        cy.get('#task-container').first().should('contain.text', 'Default')
    })
    it('removes filters when clicking the x button', async () => {
        cy.get('aside > div').first().next().click()
        cy.get('p').eq(3)

        cy.wait(1000)

        cy.get('p').eq(4)

        cy.wait(1000)

        cy.get('#task-container').first().next().should('contain.text', 'Testing')
    })
    it('toggles filter menu on clicks', () => {
        cy.get('aside > div').first().next().click()
        cy.get('p').eq(3).should('contain.text', 'Type')

        cy.get('aside > div').first().next().click()
        cy.get('div').should('not.contain.text', 'Type')
    })
    it('refreshes tasks on click', async () => {
        
        cy.wait(1000)

        cy.get('svg').eq(9)
        .click()

        cy.wait(500)

        cy.get('div').should('not.contain.text', 'Testing')

        cy.wait(1000)

        cy.get('#task-container').should('contain.text', 'Default')
    })
    it('shows creator images when loaded', () => {
        cy.wait(2000)

        cy.get('img').eq(2).should('be.visible')
    })
    it('shows project info modal', () => {
        cy.wait(1000)

        cy.get('div').should('contain.text', 'Current project:')
    })
    it('Adds a task via the add task menu', () => {
        cy.wait(1000)
        cy.get('aside > div').first().click()
        cy.get('form > input').type('Cypress')
        cy.get('#arrow-priority').click()
        cy.get('#drop-down-priority').first().first().click()
        cy.get('#arrow-type').click()
        cy.get('#drop-down-type').first().first().click()
        cy.get('textarea').type('Cypress')
        cy.get('button').click()

        cy.wait(1000)

        cy.get('div').should('contain.text', 'Cypress')
    })
    it('Shows error if one of the fields is missing', () => {
        cy.wait(1000)

        cy.get('aside > div').first().click()

        cy.get('#arrow-priority').click()
        cy.get('#drop-down-priority').first().first().click()
        cy.get('#arrow-type').click()
        cy.get('#drop-down-type').first().first().click()
        cy.get('textarea').type('Cypress')
        cy.get('button').click()

        cy.wait(1000)

        cy.get('div').should('contain.text', 'Please')
    })
    it('Deletes a task when clicking the menu', () => {
        cy.wait(1000)

        cy.get('#task-menu').click()
        cy.get('#task-delete').click()
        cy.get('div').should('not.contain.text', 'Cypress')
    })
    it('Shows edit task menu with correct data when clicking the edit button', () => {
        cy.wait(1000)

        cy.get('#task-menu').click()
        cy.get('#task-edit').click()
        cy.get('div').should('contain.text', 'Edit')
    })
    it.only('Completed task when clicking completed', () => {
        cy.wait(1000)

        cy.get('#task-menu').click()
        cy.get('#complete-task').click()

        cy.wait(1000)

        cy.get('#navbar > div > a').eq(2).click()

        cy.get('div').should('contain.text', 'Pesho')
    })
})

