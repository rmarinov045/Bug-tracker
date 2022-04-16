const baseUrl = 'http://localhost:3000'

describe('register page tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get('a').click()
    })

    it('renders register page', () => {
        cy.get('form').should('be.visible')
    })
    it('renders register button', () => {
        cy.get('button').should('exist')
    })
    it('shows error if submitting with empty fields', () => {
        cy.get('button').click()
        cy.get('div').should('contain.text', 'Password')
    })
    it('shows error if password is less than 10 chars long', () => {
        cy.get('input').first().type('test')
        cy.get('input').eq(1).type('test')
        cy.get('input').eq(2).type('test')
        cy.get('input').eq(3).type('test')
        cy.get('input').eq(4).type('lorem@ipsum.com')
        cy.get('input').eq(5).type('123456')

        cy.get('button').click()
        cy.get('div').should('contain.text', '10 symbols')
    })
    it('shows error if password and confirm password do not match', () => {
        cy.get('input').first().type('test')
        cy.get('input').eq(1).type('test')
        cy.get('input').eq(2).type('test')
        cy.get('input').eq(3).type('test')
        cy.get('input').eq(4).type('lorem@ipsum.com')
        cy.get('input').eq(5).type('12345678910')
        cy.get('input').eq(6).type('123456789')

        cy.get('button').click()
        cy.get('div').should('contain.text', 'match')
    })
    it('shows error if email does not include @ symbol', () => {
        cy.get('input').first().type('test')
        cy.get('input').eq(1).type('test')
        cy.get('input').eq(2).type('test')
        cy.get('input').eq(3).type('test')
        cy.get('input').eq(4).type('lorem.ipsum.com')
        cy.get('input').eq(5).type('12345678910')
        cy.get('input').eq(6).type('12345678910')

        cy.get('button').click()
        
        cy.url().should('contain', '/register')
    })
    it('shows error if email is already in use', () => {
        cy.get('input').first().type('test')
        cy.get('input').eq(1).type('test')
        cy.get('input').eq(2).type('test')
        cy.get('input').eq(3).type('test')
        cy.get('input').eq(4).type('lorem@ipsum.com')
        cy.get('input').eq(5).type('12345678910')
        cy.get('input').eq(6).type('12345678910')

        cy.get('button').click()

        cy.get('div').should('contain.text', 'in use')
    })
    it.only('should redirect to confirmation page if all fields are correct', () => {
        cy.get('input').first().type('test')
        cy.get('input').eq(1).type('test')
        cy.get('input').eq(2).type('test')
        cy.get('input').eq(3).type('test')
        cy.get('input').eq(4).type('lorem5@ipsum.com')
        cy.get('input').eq(5).type('12345678910')
        cy.get('input').eq(6).type('12345678910')

        cy.get('button').click()

        cy.url().should('contain', '/register/confirm-email')
    })
})

