/* eslint-disable testing-library/await-async-utils */
const baseUrl = 'http://localhost:3000'

describe('Projects tab tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get('input').first().type('lorem@ipsum.com')
        cy.get('input').eq(1).type('123456')
        cy.get('button').click()
        cy.get('nav > div > a').eq(0).click()
    })

    it('Should render project tab', () => {
        cy.get('div').should('contain.text', 'Projects')
    })
    it('Should change url', () => {
        cy.wait(500)
        cy.url().should('include', '/projects')
    })
    it('Should show currently open project', () => {
        cy.get('main > section').eq(1).get('div > ul > div > li').eq(0).should('contain.text', 'Currently')
    })
    it('Should render add project button', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').last().should('not.contain.text')
    })
    it('Should open add project menu on click of add project button', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').last().click()
        cy.get('div').should('contain.text', 'Create')
    })
    it('Should close the modal when clicking the X button', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').last().click()
        cy.get('#close-create-project').click()
        cy.get('div').should('not.contain.text', 'Create')
    })
    it('Should show error if no project name is inserted upon creation', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').last().click()
        cy.get('button').click()
        cy.get('div').should('contain.text', 'Please')
    })
    it.only('Should create new project with a valid name', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').last().click()
        cy.get('input').type('Cypress')
        cy.get('button').click()
        cy.get('div').should('contain.text', 'Cypress')
    })
    it('Should render two buttons for non-currently opened project', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').eq(1).children().first().next().children().should('have.length', 2)
    })
    it('Should show one button for currently opened project except default', () => {
        cy.wait(500)
        cy.get('main > section').eq(1).get('div > ul > div > li').eq(1).children().first().next().children().first().click()
        cy.get('nav > div > a').eq(0).click()
        cy.wait(500)
        cy.get('main > section').eq(1).get('div > ul > div > li').eq(1).children().first().next().next().children().should('have.length', 1)
    })
    it('Should delete project when clicking delete button', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').eq(2).children().first().next().children().first().next().click()
        cy.get('div').should('not.contain.text', 'Cypress')
    })
    it.only('Should change project modal with current project name', () => {
        cy.wait(1000)
        cy.get('main > section').eq(1).get('div > ul > div > li').eq(2).children().first().next().children().first().click()
        cy.get('div').should('contain.text', 'Cypress')
    })
})