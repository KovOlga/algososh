import { Buttons } from "../../src/types/buttons";
import { inputSelector, circleTestId } from "../../src/constants/selectors";

describe("String Component tests", () => {
  beforeEach(function () {
    cy.visit("/recursion");
  });

  it("should disable btn when input empty", () => {
    cy.get(inputSelector).should("have.value", "");
    cy.get(`button[name="${Buttons.Reverse}"]`).should("be.disabled");
    cy.get(inputSelector).type("word");
    cy.get(inputSelector).should("have.value", "word");
    cy.get(`button[name="${Buttons.Reverse}"]`).should("not.be.disabled");
    cy.get(inputSelector).clear();
    cy.get(`button[name="${Buttons.Reverse}"]`).should("be.disabled");
  });

  it("should reverse string of even number of letters with animation", () => {
    cy.clock();
    cy.get(inputSelector).type("react");
    cy.get(`button[name="${Buttons.Reverse}"]`).click();
    cy.get(`button[name="${Buttons.Reverse}"]`).should(
      "not.have.text",
      "Рассчитать"
    );

    cy.get("li").should("have.length", 5);
    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .should("have.text", "r")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(1)
        .should("have.text", "e")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(2)
        .should("have.text", "a")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(3)
        .should("have.text", "c")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(4)
        .should("have.text", "t")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    });

    cy.tick(1000);

    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .should("have.text", "r")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      cy.get("li")
        .eq(1)
        .should("have.text", "e")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(2)
        .should("have.text", "a")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(3)
        .should("have.text", "c")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(4)
        .should("have.text", "t")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    });

    cy.tick(1000);

    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .should("have.text", "t")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(1)
        .should("have.text", "e")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(2)
        .should("have.text", "a")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(3)
        .should("have.text", "c")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(4)
        .should("have.text", "r")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    });

    cy.tick(1000);

    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .should("have.text", "t")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(1)
        .should("have.text", "e")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      cy.get("li")
        .eq(2)
        .should("have.text", "a")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(3)
        .should("have.text", "c")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      cy.get("li")
        .eq(4)
        .should("have.text", "r")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    });

    cy.tick(1000);

    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .should("have.text", "t")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(1)
        .should("have.text", "c")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(2)
        .should("have.text", "a")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("li")
        .eq(3)
        .should("have.text", "e")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(4)
        .should("have.text", "r")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    });

    cy.tick(1000);

    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .should("have.text", "t")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(1)
        .should("have.text", "c")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(2)
        .should("have.text", "a")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      cy.get("li")
        .eq(3)
        .should("have.text", "e")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(4)
        .should("have.text", "r")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    });

    cy.tick(1000);

    cy.get("ul").within(() => {
      cy.get("li")
        .eq(0)
        .should("have.text", "t")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(1)
        .should("have.text", "c")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(2)
        .should("have.text", "a")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(3)
        .should("have.text", "e")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(4)
        .should("have.text", "r")
        .find(circleTestId)
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    });

    cy.get(`button[name="${Buttons.Reverse}"]`).should(
      "have.text",
      "Рассчитать"
    );
  });

  it("should reverse string of odd number of letters with animation", () => {
    cy.clock();
    cy.get(inputSelector).should("have.value", "");
    cy.get(inputSelector).type("fast");
    cy.get(`button[name="${Buttons.Reverse}"]`).click();
    cy.get(`button[name="${Buttons.Reverse}"]`).should("not.have.text");

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("have.text", "f")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("have.text", "a")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("have.text", "s")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("have.text", "t")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("have.text", "f")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("have.text", "a")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("have.text", "s")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("have.text", "t")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("have.text", "t")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("have.text", "a")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("have.text", "s")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("have.text", "f")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("have.text", "t")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("have.text", "a")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("have.text", "s")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("have.text", "f")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("have.text", "t")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("have.text", "s")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("have.text", "a")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("have.text", "f")
            .find(circleTestId)
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });
    cy.get(`button[name="${Buttons.Reverse}"]`).should(
      "have.text",
      "Рассчитать"
    );
  });

  it("should reverse string of one letter with animation", () => {
    cy.clock();
    cy.get(inputSelector).should("have.value", "");
    cy.get(inputSelector).type("a");
    cy.get(`button[name="${Buttons.Reverse}"]`).click();
    cy.get(`button[name="${Buttons.Reverse}"]`).should("not.have.text");

    cy.get("li")
      .should("have.length", 1)
      .first()
      .should("have.text", "a")
      .find(circleTestId)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 1)
      .first()
      .should("have.text", "a")
      .find(circleTestId)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 1)
      .first()
      .should("have.text", "a")
      .find(circleTestId)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");

    cy.get(`button[name="${Buttons.Reverse}"]`).should(
      "have.text",
      "Рассчитать"
    );
  });
});
