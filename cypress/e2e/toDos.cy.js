/* eslint-disable no-undef */
describe('todo application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should create a todo item in list', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();

    cy.contains('ToDo 1').should('exist');
  });

  it('shouldn disable save button if user didn`t input text', () => {
    cy.get('button[class="submit-todo-input"]').should('be.disabled');
    cy.get('h3[role="empty-list-text"]').should('exist');
  });

  it('should create 2 todos in list and show correct items amount', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('input[class="todo-input"]').type('ToDo 2');
    cy.get('button[class="submit-todo-input"]').click();

    cy.contains('2 Item left').should('exist');
  });

  it('should create 2 todos in list and show correct items amount', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('input[role="todo-item-checkbox"]').click();

    cy.get('div[role="todo-item-text"]')
      .should('satisfy', ($el) => {
        const classList = Array.from($el[0].classList);
        return classList.some((classString) => classString.includes('crossed'));
      });
  });

  it('should delete todo item from list', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('button[role="todo-item-delete-button"]').click();
    cy.get('h3[role="empty-list-text"]').should('exist');
  });

  it('should delete completed todo item from list', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('input[role="todo-item-checkbox"]').click();

    cy.get('button[role="todo-item-delete-button"]').click();
    cy.get('h3[role="empty-list-text"]').should('exist');
  });

  it('should add 3 todos, complete 2 of them and delete all completed todos', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 2');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 3');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('input[role="todo-item-checkbox"]').eq(0).click();
    cy.get('input[role="todo-item-checkbox"]').eq(1).click();

    cy.get('button[role="clear-completed-button"]').click();

    cy.get('div[role="todo-item-text"]')
      .should('satisfy', ($el) => {
        const classList = Array.from($el[0].classList);
        return !classList.some((classString) => classString.includes('crossed'));
      });
  });

  it('should add 3 todos, complete 1 of them, apply filter `Active`', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 2');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 3');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('input[role="todo-item-checkbox"]').eq(0).click();

    cy.get('button[role="active-filter-button"]').click();

    cy.contains('2 Item left').should('exist');
    cy.get('div[role="todo-item-text"]').should('have.length', 2);
  });

  it('should add 3 todos, complete 2 of them, apply filter `Completed`', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 2');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 3');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('input[role="todo-item-checkbox"]').eq(0).click();
    cy.get('input[role="todo-item-checkbox"]').eq(1).click();

    cy.get('button[role="completed-filter-button"]').click();

    cy.contains('2 Item left').should('exist');
    cy.get('div[role="todo-item-text"]').should('have.length', 2);
  });

  it('should add 2 todos and apply filter `Completed`', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 2');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('button[role="completed-filter-button"]').click();

    cy.get('h3[role="empty-list-text"]').should('exist');
  });

  it('should add 2 todos, complete them and apply filter `Active`', () => {
    cy.get('input[class="todo-input"]').type('ToDo 1');
    cy.get('button[class="submit-todo-input"]').click();
    cy.get('input[class="todo-input"]').type('ToDo 2');
    cy.get('button[class="submit-todo-input"]').click();

    cy.get('input[role="todo-item-checkbox"]').eq(0).click();
    cy.get('input[role="todo-item-checkbox"]').eq(1).click();

    cy.get('button[role="active-filter-button"]').click();

    cy.get('h3[role="empty-list-text"]').should('exist');
  });
});
