import { Buttons } from "../../src/types/buttons";
import {
  inputSelector,
  headTestId,
  circleTestId,
  indexTestId,
  tailTestId,
} from "../../src/constants/selectors";

describe("Queue tests", () => {
  beforeEach(function () {
    cy.visit("/queue");
  });

  it("should disable btn when input empty", () => {
    cy.get(inputSelector).should("have.value", "");
    cy.get(`button[name="${Buttons.Add}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");

    cy.get(inputSelector).type("123");
    cy.get(inputSelector).should("have.value", "123");

    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");

    cy.get(inputSelector).clear();
    cy.get(inputSelector).should("have.value", "");
    cy.get(`button[name="${Buttons.Add}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");
  });

  it("should correctly add element to queue with animation", () => {
    cy.clock();
    cy.get(inputSelector).type("a");
    cy.get(inputSelector).should("have.value", "a");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();
    cy.get(`button[name="${Buttons.Add}"]`).find('[data-testid="btn-loading"]');
    cy.get(`button[name="${Buttons.Delete}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("be.disabled");

    cy.get("li")
      .should("have.length", 7)
      .first()
      .within(() => {
        cy.get(circleTestId).should(
          "have.css",
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        cy.get(headTestId).should("have.text", "");
        cy.get(indexTestId).should("have.text", "0");
        cy.get(tailTestId).should("have.text", "");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 7)
      .first()
      .within(() => {
        cy.get(circleTestId)
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("have.text", "a");
        cy.get(headTestId).should("have.text", "head");
        cy.get(indexTestId).should("have.text", "0");
        cy.get(tailTestId).should("have.text", "tail");
      });

    cy.get(`button[name="${Buttons.Delete}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.Reset}"]`).should("not.be.disabled");

    cy.get(inputSelector).type("b");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();

    cy.get("li")
      .should("have.length", 7)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "a");
            cy.get(headTestId).should("have.text", "head");
            cy.get(indexTestId).should("have.text", "0");
            cy.get(tailTestId).should("have.text", "tail");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
              .and("have.text", "");
            cy.get(headTestId).should("have.text", "");
            cy.get(indexTestId).should("have.text", "1");
            cy.get(tailTestId).should("have.text", "");
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 7)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "a");
            cy.get(headTestId).should("have.text", "head");
            cy.get(indexTestId).should("have.text", "0");
            cy.get(tailTestId).should("have.text", "");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "b");
            cy.get(headTestId).should("have.text", "");
            cy.get(indexTestId).should("have.text", "1");
            cy.get(tailTestId).should("have.text", "tail");
          });
        }
      });
  });

  it("should correctly delete element from queue with animation", () => {
    cy.clock();
    cy.get(inputSelector).type("a");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();
    cy.tick(500);
    cy.get(inputSelector).type("b");
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
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
              .and("have.text", "a");
            cy.get(headTestId).should("have.text", "head");
            cy.get(indexTestId).should("have.text", "0");
            cy.get(tailTestId).should("have.text", "");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "b");
            cy.get(headTestId).should("have.text", "");
            cy.get(indexTestId).should("have.text", "1");
            cy.get(tailTestId).should("have.text", "tail");
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 7)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "");
            cy.get(headTestId).should("have.text", "");
            cy.get(indexTestId).should("have.text", "0");
            cy.get(tailTestId).should("have.text", "");
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
              .and("have.text", "b");
            cy.get(headTestId).should("have.text", "head");
            cy.get(indexTestId).should("have.text", "1");
            cy.get(tailTestId).should("have.text", "tail");
          });
        }
      });
  });

  it("should correctly clean queue", () => {
    cy.get("li")
      .should("have.length", 7)
      .get(circleTestId)
      .should("have.text", "");

    cy.get(inputSelector).type("123");
    cy.get(`button[name="${Buttons.Add}"]`).should("not.be.disabled").click();

    cy.get(inputSelector).type("456");
    cy.get(`button[name="${Buttons.Add}"]`).click();

    cy.get(`button[name="${Buttons.Reset}"]`).should("not.be.disabled").click();
    cy.get("li")
      .should("have.length", 7)
      .get(circleTestId)
      .should("have.text", "");
  });
});
