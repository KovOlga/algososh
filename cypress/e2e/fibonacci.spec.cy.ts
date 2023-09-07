describe("Fibonacci test", () => {
  beforeEach(function () {
    cy.visit("/fibonacci");
  });

  it("should disable btn when input empty", () => {
    cy.get('input[name="input"]').should("have.value", "");
    cy.get('button[name="Рассчитать"]').should("be.disabled");
    cy.get('input[name="input"]').type("12");
    cy.get('input[name="input"]').should("have.value", "12");
    cy.get('button[name="Рассчитать"]').should("not.be.disabled");
    cy.get('input[name="input"]').clear();
    cy.get('button[name="Рассчитать"]').should("be.disabled");
  });

  it("should generate fibonacci sequence correctly", () => {
    cy.clock();

    cy.get('input[name="input"]').should("have.value", "");
    cy.get('button[name="Рассчитать"]').should("be.disabled");
    cy.get('input[name="input"]').type("3");
    cy.get('button[name="Рассчитать"]').should("not.be.disabled");
    cy.get('button[name="Рассчитать"]').click();

    cy.get("li").should("have.length", 0);

    cy.tick(500);

    cy.get("li")
      .should("have.length", 1)
      .last()
      .get('[data-testid="circle-text"]')
      .should("contain.text", "1")
      .get('[data-testid="index"]')
      .should("contain.text", "0");

    cy.tick(500);

    cy.get("li")
      .should("have.length", 2)
      .last()
      .get('[data-testid="circle-text"]')
      .should("contain.text", "1")
      .get('[data-testid="index"]')
      .should("contain.text", "1");

    cy.tick(500);

    cy.get("li")
      .should("have.length", 3)
      .last()
      .get('[data-testid="circle-text"]')
      .should("contain.text", "2")
      .get('[data-testid="index"]')
      .should("contain.text", "2");

    cy.tick(500);

    cy.get("li")
      .should("have.length", 4)
      .last()
      .get('[data-testid="circle-text"]')
      .should("contain.text", "3")
      .get('[data-testid="index"]')
      .should("contain.text", "3");

    cy.tick(500);

    cy.get('button[name="Рассчитать"]').should("have.text", "Рассчитать");
  });
});
