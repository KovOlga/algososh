describe("String Component tests", () => {
  beforeEach(function () {
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

  it("should reverse string of even number of letters with animation", () => {
    cy.clock();
    cy.get('input[name="input"]').should("have.value", "");
    cy.get('input[name="input"]').type("react");
    cy.get('button[name="Рассчитать"]').click();
    cy.get('button[name="Рассчитать"]').should("not.have.text");

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "r")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "e")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "c")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 4) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "r")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "e")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "c")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 4) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "e")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "c")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 4) {
          cy.wrap($li)
            .should("contain.text", "r")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "e")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "c")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 4) {
          cy.wrap($li)
            .should("contain.text", "r")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "c")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "e")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 4) {
          cy.wrap($li)
            .should("contain.text", "r")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "c")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "e")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 4) {
          cy.wrap($li)
            .should("contain.text", "r")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 5)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "c")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "e")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 4) {
          cy.wrap($li)
            .should("contain.text", "r")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });
    cy.get('button[name="Рассчитать"]').should("have.text", "Рассчитать");
  });

  it("should reverse string of odd number of letters with animation", () => {
    cy.clock();
    cy.get('input[name="input"]').should("have.value", "");
    cy.get('input[name="input"]').type("fast");
    cy.get('button[name="Рассчитать"]').click();
    cy.get('button[name="Рассчитать"]').should("not.have.text");

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "f")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "s")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "f")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "s")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "s")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "f")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "s")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "f")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "t")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 1) {
          cy.wrap($li)
            .should("contain.text", "s")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 2) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
        if (index === 3) {
          cy.wrap($li)
            .should("contain.text", "f")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });
    cy.get('button[name="Рассчитать"]').should("have.text", "Рассчитать");
  });

  it("should reverse string of one letter with animation", () => {
    cy.clock();
    cy.get('input[name="input"]').should("have.value", "");
    cy.get('input[name="input"]').type("a");
    cy.get('button[name="Рассчитать"]').click();
    cy.get('button[name="Рассчитать"]').should("not.have.text");

    cy.get("li")
      .should("have.length", 1)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 1)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

    cy.tick(1000);

    cy.get("li")
      .should("have.length", 1)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li)
            .should("contain.text", "a")
            .find('[data-testid="circle"]')
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });
    cy.get('button[name="Рассчитать"]').should("have.text", "Рассчитать");
  });
});
