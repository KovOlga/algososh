describe("routing tests", () => {
  it("app opens", () => {
    cy.visit("/");
    cy.get('[data-testid="main-page"]');
  });

  it("visits recursion-page", () => {
    cy.visit("/");
    cy.get('[data-testid="recursion-link"]').click();
    cy.get('[data-testid="recursion-page"]');
    cy.get('[data-testid="return-link"]').click();
    cy.get('[data-testid="main-page"]');
  });

  it("visits fibonacci-page", () => {
    cy.visit("/");
    cy.get('[data-testid="fibonacci-link"]').click();
    cy.get('[data-testid="fibonacci-page"]');
    cy.get('[data-testid="return-link"]').click();
    cy.get('[data-testid="main-page"]');
  });

  it("visits sorting-page", () => {
    cy.visit("/");
    cy.get('[data-testid="sorting-link"]').click();
    cy.get('[data-testid="sorting-page"]');
    cy.get('[data-testid="return-link"]').click();
    cy.get('[data-testid="main-page"]');
  });

  it("visits stack-page", () => {
    cy.visit("/");
    cy.get('[data-testid="stack-link"]').click();
    cy.get('[data-testid="stack-page"]');
    cy.get('[data-testid="return-link"]').click();
    cy.get('[data-testid="main-page"]');
  });

  it("visits queue-page", () => {
    cy.visit("/");
    cy.get('[data-testid="queue-link"]').click();
    cy.get('[data-testid="queue-page"]');
    cy.get('[data-testid="return-link"]').click();
    cy.get('[data-testid="main-page"]');
  });

  it("visits list-page", () => {
    cy.visit("/");
    cy.get('[data-testid="list-link"]').click();
    cy.get('[data-testid="list-page"]');
    cy.get('[data-testid="return-link"]').click();
    cy.get('[data-testid="main-page"]');
  });
});
