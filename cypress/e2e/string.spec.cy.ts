describe("String Component tests", () => {
  before(function () {
    cy.visit("/recursion");
  });

  it("should disable btn when input empty", () => {
    cy.get('input[name="input"]').should("have.value", "");
    cy.get('button[name="Рассчитать"]').should("be.disabled");
    cy.get('input[name="input"]').type("word");
    cy.get('input[name="input"]').should("have.value", "word");
    cy.get('button[name="Рассчитать"]').should("not.be.disabled");
    cy.get('input[name="input"]').clear();
    cy.get('button[name="Рассчитать"]').should("be.disabled");
  });

  it("should reverse string correctly with animation", () => {});
});
