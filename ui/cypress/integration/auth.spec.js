describe('Authentication ', () => {
  describe('When I enter valid details when signing up', () => {
    it('I am taken to the login page', () => {
      cy.visit('/')
      cy.get('input[name=email]').type('joe@bloggs.com')
      cy.get('input[name=password]').type('secret password')

      cy.get('button').click()

      cy.url().should('include', '/login')
    })
  })

  describe('When I enter valid details when logging in', () => {
    it('I am taken to the dashboard page', () => {
      cy.visit('/login')
      cy.get('input[name=email]').type('admin@admin.com')
      cy.get('input[name=password]').type('secret-password')

      cy.get('button').click()

      cy.url().should('include', '/dashboard')
    })
  })
})
