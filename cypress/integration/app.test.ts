/// <reference types="cypress" />
// @ts-check

describe('App should', () => {
    before(() => {
        cy.visit('http://localhost:3001/');
    });

    it('display start chat icon', () => {
        cy.get('[data-cy=start-chat]').should('exist');
    });

    it('not display chat window', () => {
        cy.get('[data-cy=app-header]').should('not.exist');
        cy.get('[data-cy=app-body]').should('not.exist');
        cy.get('[data-cy=app-footer]').should('not.exist');
    });
});

describe('After clicking message icon app should', () => {
    before(() => {
        cy.visit('http://localhost:3001/');
        cy.get('[data-cy=start-chat]').click();
    });

    after(() => {
        cy.get('[data-cy=start-chat]').click();
    });

    it('display header', () => {
        cy.get('[data-cy=app-header]').should('exist');
        cy.get('[data-cy=app-header]').contains('Chat');
    });
    it('display body', () => {
        cy.get('[data-cy=app-body]').should('exist');
    });
    it('displays footer', () => {
        cy.get('[data-cy=app-footer]').should('exist');
    });
});

describe('Message should', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/');
        cy.get('[data-cy=start-chat]').click();
    });

    afterEach(() => {
        cy.get('[data-cy=start-chat]').click();
    });

    it('be sent by hitting return', () => {
        const newMessage = 'How r u doing?';
        cy.get('[data-cy=app-footer-textField]').type(`${newMessage}{enter}`);
        cy.contains('You said:').should('be.visible');
    });

    it('be sent by clicking send button', () => {
        const newMessage = 'I pressed sent button!';
        cy.get('[data-cy=app-footer-textField]').type(newMessage);
        cy.get('[data-cy=app-footer-sendButton]').click();
        cy.contains('You said:').should('be.visible');
    });

    it('be visible in the chat history', () => {
        const newMessage = 'Am I visible?';
        cy.get('[data-cy=app-footer-textField]').type(`${newMessage}{enter}`);
        cy.get('[data-cy=app-body]').contains(newMessage).should('be.visible');
    });
});

describe('Messages', () => {
    before(() => {
        cy.visit('http://localhost:3001/');
        cy.get('[data-cy=start-chat]').click();
    });

    after(() => {
        cy.get('[data-cy=start-chat]').click();
    });

    it('should have different colors', () => {
        const newMessage = 'How r u doing?';
        cy.get('[data-cy=app-footer-textField]').type(`${newMessage}{enter}`);
        cy.contains(newMessage).parent().should('have.css', 'background-color', 'rgb(0, 120, 254)');
        cy.contains('You said:').parent().should('have.css', 'background-color', 'rgb(222, 222, 222)');
    });
});

describe('Message with image', () => {
    before(() => {
        cy.visit('http://localhost:3001/');
        cy.get('[data-cy=start-chat]').click();
    });

    after(() => {
        cy.get('[data-cy=start-chat]').click();
    });

    it('should be visible', () => {
        const newMessage = 'cat image';
        cy.get('[data-cy=app-footer-textField]').type(`${newMessage}{enter}`);
        cy.get('[data-cy=message-img]').should('be.visible');
    });
});
