/* eslint-disable testing-library/await-async-utils */
const baseUrl = 'http://localhost:3000'

describe('Profile page tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get('input').first().type('lorem@ipsum.com')
        cy.get('input').eq(1).type('123456')
        cy.get('button').click()
        cy.get('nav > div > a').eq(3).click()
    })

    it('Should render profile page', () => {
        cy.get('#profile-container').should('exist')
    })
    it('Should change the url', () => {
        cy.url().should('include', '/profile')
    })
    it('Should render two containers', () => {
        cy.get('#profile-container > div').children().should('have.length', 2)
    })
    it('Should render profile image', () => {
        cy.wait(500)
        cy.get('img').eq(1).should('exist')
    })
    it('Should render update profile button', () => {
        cy.get('button').eq(0).should('contain.text', 'Update')
    })
    it('Should render reset password button', () => {
        cy.get('button').eq(1).should('contain.text', 'Reset')
    })
    it('Should render current user data in the form', () => {
        cy.wait(1500)
        cy.get('#position').should('contain.value', 'GC')
    })
    it('Should render current user data in the profile card', () => {
        cy.wait(500)
        cy.get('.bg-slate-50 > :nth-child(3)').should('contain.text', 'GC')
    })
    it('Should render remove profile picture button when picture is not the default one', () => {
        cy.get(':nth-child(5) > .font-bold').should('exist')
    })
    it('Should upate profile on click of the update profile button', () => {
        cy.wait(500)
        cy.get('#firstName').type('Tester 2')
        cy.get('#lastName').type('Tester Last Name')
        cy.get('#company').type('Tester Company')
        cy.get('#position').type('Tester')
        cy.get('.bg-blue-400').click()
        cy.wait(500)
        cy.get('#firstName').should('have.value', 'Tester 2')
    })
})