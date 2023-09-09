import { Buttons } from "../../src/types/buttons";

describe("Stack tests", () => {
  beforeEach(function () {
    cy.visit("/stack");
  });

  it("should disable btn when input empty", () => {
    cy.get('input[name="input"]').should("have.value", "");
    cy.get(`button[name="${Buttons.Add}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");

    cy.get('input[name="input"]').type("123");
    cy.get('input[name="input"]').should("have.value", "123");

    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");

    cy.get('input[name="input"]').clear();
    cy.get('input[name="input"]').should("have.value", "");
    cy.get(`button[name="${Buttons.Add}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");
  });

  it("should correctly add element to stack with animation", () => {
    cy.clock();
    cy.get('input[name="input"]').type("a");
    cy.get('input[name="input"]').should("have.value", "a");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();

    cy.get("li")
      .should("have.length", 1)
      .first()
      .within(() => {
        cy.get('[data-testid="circle"]').should(
          "have.css",
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        cy.get('[data-testid="head"]').should("have.text", "top");
        cy.get('[data-testid="index"]').should("have.text", "0");
      });

    cy.get(`button[name="${Buttons.Add}"]`).find('[data-testid="btn-loading"]');
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");

    cy.tick(500);

    cy.get("li")
      .should("have.length", 1)
      .find('[data-testid="circle"]')
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.get(`button[name="${Buttons.Delete}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("not.be.disabled");

    cy.get('input[name="input"]').type("b");
    cy.get('input[name="input"]').should("have.value", "b");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();

    cy.get("li")
      .should("have.length", 2)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]').should(
              "have.css",
              "border",
              "4px solid rgb(0, 50, 255)"
            );
            cy.get('[data-testid="head"]').should("have.text", "");
            cy.get('[data-testid="index"]').should("have.text", "0");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]').should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
            cy.get('[data-testid="head"]').should("have.text", "top");
            cy.get('[data-testid="index"]').should("have.text", "1");
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 2)
      .last()
      .find('[data-testid="circle"]')
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("should correctly delete element from stack with animation", () => {
    cy.clock();
    cy.get('input[name="input"]').type("a");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();
    cy.tick(500);
    cy.get('input[name="input"]').type("b");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();
    cy.tick(500);

    cy.get(`button[name="${Buttons.Delete}"]`)
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .should("have.length", 2)
      .last()
      .find('[data-testid="circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.tick(500);

    cy.get("li")
      .should("have.length", 1)
      .first()
      .within(() => {
        cy.get('[data-testid="circle"]').should(
          "have.css",
          "border",
          "4px solid rgb(0, 50, 255)"
        );
        cy.get('[data-testid="head"]').should("have.text", "top");
      });
  });

  it("should correctly clean stack", () => {
    cy.clock();
    cy.get('input[name="input"]').type("123");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();
    cy.tick(500);
    cy.get('input[name="input"]').type("456");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();
    cy.tick(500);
    cy.get('input[name="input"]').type("789");
    cy.get(`button[name="${Buttons.Add}"]`).click();
    cy.tick(500);

    cy.get(`button[name="${Buttons.Reset}"]`).should("not.be.disabled").click();
    cy.get("li").should("have.length", 0);
    cy.get(`button[name="${Buttons.Add}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");
  });
});
