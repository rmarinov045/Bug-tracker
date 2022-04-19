/* eslint-disable testing-library/await-async-utils */
const baseUrl = 'http://localhost:3000'

describe('Navbar functionality tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get('input').first().type('lorem@ipsum.com')
        cy.get('input').eq(1).type('123456')
        cy.get('button').click()
    })
    it('should change theme on click of the theme button', () => {
        cy.get('nav > div > a').last().next().click()
        cy.wait(200)
        cy.get('nav').should('have.css', 'background-color').and('eq', 'rgb(49, 46, 129)')
    })
    it.only('Should log user out on click of logout button', () => {
        cy.get('nav > div').last().click()
        cy.wait(200)
        cy.get('div').should('contain.text', 'Log')
    })
})