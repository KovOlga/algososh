import { Buttons } from "../../src/types/buttons";
import {
  headTestId,
  circleTestId,
  tailTestId,
  indexTestId,
} from "../../src/constants/selectors";

describe("Linked List tests", () => {
  beforeEach(function () {
    cy.visit("/list");
  });

  it("should disable btns with empty input", () => {
    cy.get('input[name="inputValue"]').should("have.value", "");
    cy.get('input[name="inputIndex"]').should("have.value", "");
    cy.get(`button[name="${Buttons.Prepend}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.Append}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.AddByIndex}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.DeleteByIndex}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.DeleteHead}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.DeleteTail}"]`).should("not.be.disabled");

    cy.get('input[name="inputValue"]').type("123");
    cy.get('input[name="inputValue"]').should("have.value", "123");
    cy.get('input[name="inputIndex"]').should("have.value", "");
    cy.get(`button[name="${Buttons.Prepend}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.Append}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.DeleteHead}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.DeleteTail}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.AddByIndex}"]`).should("be.disabled");
    cy.get(`button[name="${Buttons.DeleteByIndex}"]`).should("be.disabled");

    cy.get('input[name="inputIndex"]').type("2");
    cy.get('input[name="inputIndex"]').should("have.value", "2");
    cy.get(`button[name="${Buttons.Prepend}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.Append}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.DeleteHead}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.DeleteTail}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.AddByIndex}"]`).should("not.be.disabled");
    cy.get(`button[name="${Buttons.DeleteByIndex}"]`).should("not.be.disabled");
  });

  it("should corectly show default list", () => {
    cy.get("li").should("have.length", 4);

    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .within(() => {
          cy.get(headTestId).should("have.text", "head");
          cy.get(circleTestId).should("have.text", "12");
          cy.get(indexTestId).should("have.text", "0");
          cy.get(tailTestId).should("have.text", "");
        });
      cy.get("li")
        .eq(1)
        .within(() => {
          cy.get(headTestId).should("have.text", "");
          cy.get(circleTestId).should("have.text", "13");
          cy.get(indexTestId).should("have.text", "1");
          cy.get(tailTestId).should("have.text", "");
        });
      cy.get("li")
        .eq(2)
        .within(() => {
          cy.get(headTestId).should("have.text", "");
          cy.get(circleTestId).should("have.text", "14");
          cy.get(indexTestId).should("have.text", "2");
          cy.get(tailTestId).should("have.text", "");
        });
      cy.get("li")
        .eq(3)
        .within(() => {
          cy.get(headTestId).should("have.text", "");
          cy.get(circleTestId).should("have.text", "15");
          cy.get(indexTestId).should("have.text", "3");
          cy.get(tailTestId).should("have.text", "tail");
        });
    });
  });

  it("should corectly add element to head", () => {
    cy.clock();
    cy.get('input[name="inputValue"]').type("ab");
    cy.get(`button[name="${Buttons.Prepend}"]`)
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .first()
      .within(() => {
        cy.get(headTestId)
          .first()
          .find(circleTestId)
          .should("have.text", "ab")
          .and("have.css", "border", "4px solid rgb(210, 82, 225)");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", "5")
      .first()
      .within(() => {
        cy.get(headTestId).should("have.text", "head");
        cy.get(circleTestId).should(
          "have.css",
          "border",
          "4px solid rgb(127, 224, 81)"
        );
      });

    cy.tick(500);

    cy.get("li")
      .first()
      .find(circleTestId)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("should corectly add element to tail", () => {
    cy.clock();
    cy.get('input[name="inputValue"]').type("bc");
    cy.get(`button[name="${Buttons.Append}"]`)
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .last()
      .within(() => {
        cy.get(headTestId)
          .first()
          .find(circleTestId)
          .should("have.text", "bc")
          .and("have.css", "border", "4px solid rgb(210, 82, 225)");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", "5")
      .last()
      .within(() => {
        cy.get(tailTestId).should("have.text", "tail");
        cy.get(circleTestId).should(
          "have.css",
          "border",
          "4px solid rgb(127, 224, 81)"
        );
      });

    cy.tick(500);

    cy.get("li")
      .last()
      .find(circleTestId)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("should corectly delete element from head", () => {
    cy.clock();
    cy.get(`button[name="${Buttons.DeleteHead}"]`)
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .should("have.length", 4)
      .first()
      .within(() => {
        cy.get(headTestId).should("have.text", "head");
        cy.get(circleTestId).first().should("have.text", "");
        cy.get(tailTestId)
          .first()
          .find(circleTestId)
          .should("have.text", "12")
          .and("have.css", "border", "4px solid rgb(210, 82, 225)");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", "3")
      .first()
      .within(() => {
        cy.get(headTestId).should("have.text", "head");
        cy.get(circleTestId)
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("have.text", "13");
      });
  });

  it("should corectly delete element from tail", () => {
    cy.clock();
    cy.get(`button[name="${Buttons.DeleteTail}"]`)
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .should("have.length", 4)
      .last()
      .within(() => {
        cy.get(circleTestId).first().should("have.text", "");
        cy.get(tailTestId)
          .first()
          .find(circleTestId)
          .should("have.text", "15")
          .and("have.css", "border", "4px solid rgb(210, 82, 225)");
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", "3")
      .last()
      .within(() => {
        cy.get(tailTestId).should("have.text", "tail");
        cy.get(circleTestId)
          .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          .and("have.text", "14");
      });
  });

  it("should corectly add element by index", () => {
    cy.clock();
    cy.get('input[name="inputValue"]').should("have.value", "").type("55");
    cy.get('input[name="inputIndex"]').should("have.value", "").type("2");
    cy.get(`button[name="${Buttons.AddByIndex}"]`)
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .first()
      .find(headTestId)
      .find(circleTestId)
      .should("have.text", "55")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.tick(500);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should("have.text", "head");
            cy.get(circleTestId).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          });
        }
        if (index === 1) {
          cy.wrap($li)
            .find(headTestId)
            .find(circleTestId)
            .should("have.text", "55")
            .and("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should("have.text", "");
            cy.get(circleTestId).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          });
        }
        if (index === 2) {
          cy.wrap($li)
            .find(headTestId)
            .find(circleTestId)
            .should("have.text", "55")
            .and("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 2) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should("have.text", "");
            cy.get(circleTestId)
              .should("have.text", "55")
              .and("have.css", "border", "4px solid rgb(127, 224, 81)");
          });
        }
        if (index === 3) {
          cy.wrap($li).within(() => {
            cy.get(headTestId).should("have.text", "");
            cy.get(circleTestId)
              .should("have.text", "14")
              .and("have.css", "border", "4px solid rgb(0, 50, 255)");
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 2) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .should("have.text", "55")
              .and("have.css", "border", "4px solid rgb(0, 50, 255)");
          });
        }
      });
  });

  it("should corectly delete element by index", () => {
    cy.clock();
    cy.get('input[name="inputIndex"]').should("have.value", "").type("2");
    cy.get(`button[name="${Buttons.DeleteByIndex}"]`)
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .should("have.length", 4)
      .first()
      .within(() => {
        cy.get(headTestId).should("have.text", "head");
        cy.get(circleTestId).should(
          "have.css",
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 2) {
          cy.wrap($li).within(() => {
            cy.get(circleTestId)
              .first()
              .should("have.text", "")
              .and("have.css", "border", "4px solid rgb(0, 50, 255)");

            cy.get(tailTestId)
              .find(circleTestId)
              .should("have.text", "14")
              .and("have.css", "border", "4px solid rgb(210, 82, 225)");
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 3)
      .each(($li, index) => {
        if (index === 2) {
          cy.wrap($li)
            .find(circleTestId)
            .should("have.text", "15")
            .and("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });
  });
});
