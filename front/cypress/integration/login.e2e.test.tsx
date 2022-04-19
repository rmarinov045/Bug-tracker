const baseUrl = 'http://localhost:3000'

describe('Login form test', () => {

    beforeEach(() => cy.visit(baseUrl))

    it('renders register link', () => {
        cy.get('a').should('include.text', 'account')
    })
    it('renders form', () => {
        cy.get('form').should('be.visible')
    })
    it('renders logo image', () => {
        cy.get('img').should('be.visible')
    })
    it('renders edu crendetials', () => {
        cy.get('.fixed').should('include.text', 'educational')
    })
    it('shows error when clicking login with empty fields', () => {
        cy.get('button').click()
        cy.get('div').should('contain.text', 'Please fill')
    })
    it('shows error when email does include @ symbol', () => {
        cy.get('input').first().type('lorem.ipsum.com')
        cy.get('input').next().next().type('123456')
        cy.get('button').click()
        cy.get('div').should('contain.text', 'valid email')
    })
    it('shows error if credentials are incorrect', () => {
        cy.get('input').first().type('lorem2@ipsum.com')
        cy.get('input').next().next().type('123456')
        cy.get('button').click()
        cy.get('div').should('contain.text', 'Incorrect')
    })
    it('redirect to homepage if credentials are correct', () => {
        cy.get('input').first().type('lorem@ipsum.com')
        cy.get('input').next().next().type('123456')
        cy.get('button').click()
        cy.url().should('include', 'admin')
    })
})
