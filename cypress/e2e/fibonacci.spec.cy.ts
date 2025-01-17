import { inputSelector, indexTestId } from "../../src/constants/selectors";
import { Buttons } from "../../src/types/buttons";

describe("Fibonacci test", () => {
  beforeEach(function () {
    cy.visit("/fibonacci");
  });

  it("should disable btn when input empty", () => {
    cy.get(inputSelector).should("have.value", "");
    cy.get(`button[name="${Buttons.Count}"]`).should("be.disabled");
    cy.get(inputSelector).type("12");
    cy.get(inputSelector).should("have.value", "12");
    cy.get(`button[name="${Buttons.Count}"]`).should("not.be.disabled");
    cy.get(inputSelector).clear();
    cy.get(`button[name="${Buttons.Count}"]`).should("be.disabled");
  });

  it("should generate fibonacci sequence correctly", () => {
    cy.clock();

    cy.get(inputSelector).should("have.value", "");
    cy.get(`button[name="${Buttons.Count}"]`).should("be.disabled");
    cy.get(inputSelector).type("3");
    cy.get(`button[name="${Buttons.Count}"]`).should("not.be.disabled").click();

    cy.get("li").should("have.length", 0);

    cy.tick(500);

    cy.get("li")
      .should("have.length", 1)
      .last()
      .within(() => {
        cy.get('[data-testid="circle-text"]').should("have.text", "1");
        cy.get(indexTestId).should("have.text", "0");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 2)
      .last()
      .within(() => {
        cy.get('[data-testid="circle-text"]').should("have.text", "1");
        cy.get(indexTestId).should("have.text", "1");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 3)
      .last()
      .within(() => {
        cy.get('[data-testid="circle-text"]').should("have.text", "2");
        cy.get(indexTestId).should("have.text", "2");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 4)
      .last()
      .within(() => {
        cy.get('[data-testid="circle-text"]').should("have.text", "3");
        cy.get(indexTestId).should("have.text", "3");
      });

    cy.tick(500);

    cy.get(`button[name="${Buttons.Count}"]`).should("have.text", "Рассчитать");
  });
});
