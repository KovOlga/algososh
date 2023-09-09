import { Buttons } from "../../src/types/buttons";

describe("Queue tests", () => {
  beforeEach(function () {
    cy.visit("/queue");
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

  it("should correctly add element to queue with animation", () => {
    cy.clock();
    cy.get('input[name="input"]').type("a");
    cy.get('input[name="input"]').should("have.value", "a");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();
    cy.get(`button[name="${Buttons.Add}"]`).find('[data-testid="btn-loading"]');
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");

    cy.get("li")
      .should("have.length", 7)
      .first()
      .within(() => {
        cy.get('[data-testid="circle"]').should(
          "have.css",
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        cy.get('[data-testid="head"]').should("have.text", "");
        cy.get('[data-testid="index"]').should("have.text", "0");
        cy.get('[data-testid="tail"]').should("have.text", "");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 7)
      .first()
      .within(() => {
        cy.get('[data-testid="circle"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("have.text", "a");
        cy.get('[data-testid="head"]').should("have.text", "head");
        cy.get('[data-testid="index"]').should("have.text", "0");
        cy.get('[data-testid="tail"]').should("have.text", "tail");
      });

    cy.get(`button[name="${Buttons.Delete}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("not.be.disabled");

    cy.get('input[name="input"]').type("b");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();

    cy.get("li")
      .should("have.length", 7)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "a");
            cy.get('[data-testid="head"]').should("have.text", "head");
            cy.get('[data-testid="index"]').should("have.text", "0");
            cy.get('[data-testid="tail"]').should("have.text", "tail");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
              .and("have.text", "");
            cy.get('[data-testid="head"]').should("have.text", "");
            cy.get('[data-testid="index"]').should("have.text", "1");
            cy.get('[data-testid="tail"]').should("have.text", "");
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 7)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "a");
            cy.get('[data-testid="head"]').should("have.text", "head");
            cy.get('[data-testid="index"]').should("have.text", "0");
            cy.get('[data-testid="tail"]').should("have.text", "");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "b");
            cy.get('[data-testid="head"]').should("have.text", "");
            cy.get('[data-testid="index"]').should("have.text", "1");
            cy.get('[data-testid="tail"]').should("have.text", "tail");
          });
        }
      });
  });

  it("should correctly delete element from queue with animation", () => {
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
      .should("have.length", 7)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
              .and("have.text", "a");
            cy.get('[data-testid="head"]').should("have.text", "head");
            cy.get('[data-testid="index"]').should("have.text", "0");
            cy.get('[data-testid="tail"]').should("have.text", "");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "b");
            cy.get('[data-testid="head"]').should("have.text", "");
            cy.get('[data-testid="index"]').should("have.text", "1");
            cy.get('[data-testid="tail"]').should("have.text", "tail");
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 7)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "");
            cy.get('[data-testid="head"]').should("have.text", "");
            cy.get('[data-testid="index"]').should("have.text", "0");
            cy.get('[data-testid="tail"]').should("have.text", "");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "b");
            cy.get('[data-testid="head"]').should("have.text", "head");
            cy.get('[data-testid="index"]').should("have.text", "1");
            cy.get('[data-testid="tail"]').should("have.text", "tail");
          });
        }
      });
  });

  it("should correctly clean queue", () => {
    cy.get("li")
      .should("have.length", 7)
      .get('[data-testid="circle"]')
      .should("have.text", "");

    cy.get('input[name="input"]').type("123");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();

    cy.get('input[name="input"]').type("456");
    cy.get(`button[name="${Buttons.Add}"]`).click();

    cy.get(`button[name="${Buttons.Reset}"]`).should("not.be.disabled").click();
    cy.get("li")
      .should("have.length", 7)
      .get('[data-testid="circle"]')
      .should("have.text", "");
  });
});
