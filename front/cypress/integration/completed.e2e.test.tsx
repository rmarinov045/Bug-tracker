/* eslint-disable testing-library/await-async-utils */
const baseUrl = 'http://localhost:3000'

describe('Completed tasks dashboard tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get('input').first().type('lorem@ipsum.com')
        cy.get('input').eq(1).type('123456')
        cy.get('button').click()
        cy.get('nav > div > a').eq(2).click()
    })

    it('Should render completed tasks dashboard', () => {
        cy.get('div').should('contain.text', 'Resolved')
    })
    it('Should render completed tasks if any', () => {
        cy.get('div').should('contain.text', 'project')
    })
    it('Should expand completed task info on click', () => {
        cy.wait(1000)
        cy.get('#completed-task-container > ul > div > li').eq(0).click()
        cy.get('div').should('contain.text', 'High')
    })
    it('Should render search field', () => {
        cy.get('input').should('exist')
    })
    it('Should search for tasks based on task name', () => {
        cy.wait(1000)
        cy.get('input').focus().type('Test')

        cy.wait(1000)

        cy.get('#completed-task-container > ul > div > li').eq(0).should('contain.text', 'Test')
        cy.get('#completed-task-container > ul').children().should('have.length', 1)
    })
    it('Should render reload button', () => {
        cy.get('.animate-spin').should('be.visible')
    })
    it('Should reload tasks when clicked', () => {
        cy.wait(1000)

        cy.get('#completed-task-container > div > p').next().click()
        cy.get('#completed-task-container > div > p').next().should('have.class', 'animate-spin')
        cy.get('#completed-task-container > ul').children().should('have.length', 1)

        cy.wait(1000)

        cy.get('#completed-task-container > ul').children().should('have.length', 3)
    })
    it.only('Should render charts if there are completed tasks', () => {
        cy.wait(1000)

        cy.get('#charts-container').children().should('have.length', 2)
    })
})