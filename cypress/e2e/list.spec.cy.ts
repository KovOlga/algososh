import { first } from "cypress/types/lodash";

describe("Linked List tests", () => {
  beforeEach(function () {
    cy.visit("/list");
  });

  // it("should disable btns with empty input", () => {
  //   cy.get('input[name="inputValue"]').should("have.value", "");
  //   cy.get('input[name="inputIndex"]').should("have.value", "");
  //   cy.get('button[name="Добавить в head"]').should("be.disabled");
  //   cy.get('button[name="Добавить в tail"]').should("be.disabled");
  //   cy.get('button[name="Добавить по индексу"]').should("be.disabled");
  //   cy.get('button[name="Удалить по индексу"]').should("be.disabled");
  //   cy.get('button[name="Удалить из head"]').should("not.be.disabled");
  //   cy.get('button[name="Удалить из tail"]').should("not.be.disabled");

  //   cy.get('input[name="inputValue"]').type("123");
  //   cy.get('input[name="inputValue"]').should("have.value", "123");
  //   cy.get('input[name="inputIndex"]').should("have.value", "");
  //   cy.get('button[name="Добавить в head"]').should("not.be.disabled");
  //   cy.get('button[name="Добавить в tail"]').should("not.be.disabled");
  //   cy.get('button[name="Удалить из head"]').should("not.be.disabled");
  //   cy.get('button[name="Удалить из tail"]').should("not.be.disabled");
  //   cy.get('button[name="Добавить по индексу"]').should("be.disabled");
  //   cy.get('button[name="Удалить по индексу"]').should("be.disabled");

  //   cy.get('input[name="inputIndex"]').type("2");
  //   cy.get('input[name="inputValue"]').should("have.value", "123");
  //   cy.get('input[name="inputIndex"]').should("have.value", "2");
  //   cy.get('button[name="Добавить в head"]').should("not.be.disabled");
  //   cy.get('button[name="Добавить в tail"]').should("not.be.disabled");
  //   cy.get('button[name="Удалить из head"]').should("not.be.disabled");
  //   cy.get('button[name="Удалить из tail"]').should("not.be.disabled");
  //   cy.get('button[name="Добавить по индексу"]').should("not.be.disabled");
  //   cy.get('button[name="Удалить по индексу"]').should("not.be.disabled");
  // });

  // it("should corectly show default list", () => {
  //   cy.get("li")
  //     .should("have.length", 4)
  //     .each(($li, index) => {
  //       if (index === 0) {
  //         cy.wrap($li).within(() => {
  //           cy.get('[data-testid="head"]').should("have.text", "head");
  //           cy.get('[data-testid="circle"]').should("have.text", "12");
  //           cy.get('[data-testid="index"]').should("have.text", "0");
  //           cy.get('[data-testid="tail"]').should("have.text", "");
  //         });
  //       }
  //       if (index === 1) {
  //         cy.wrap($li).within(() => {
  //           cy.get('[data-testid="head"]').should("have.text", "");
  //           cy.get('[data-testid="circle"]').should("have.text", "13");
  //           cy.get('[data-testid="index"]').should("have.text", "1");
  //           cy.get('[data-testid="tail"]').should("have.text", "");
  //         });
  //       }
  //       if (index === 2) {
  //         cy.wrap($li).within(() => {
  //           cy.get('[data-testid="head"]').should("have.text", "");
  //           cy.get('[data-testid="circle"]').should("have.text", "14");
  //           cy.get('[data-testid="index"]').should("have.text", "2");
  //           cy.get('[data-testid="tail"]').should("have.text", "");
  //         });
  //       }
  //       if (index === 3) {
  //         cy.wrap($li).within(() => {
  //           cy.get('[data-testid="head"]').should("have.text", "");
  //           cy.get('[data-testid="circle"]').should("have.text", "15");
  //           cy.get('[data-testid="index"]').should("have.text", "3");
  //           cy.get('[data-testid="tail"]').should("have.text", "tail");
  //         });
  //       }
  //     });
  // });

  // it("should corectly add element to head", () => {
  // cy.clock();
  // cy.get('input[name="inputValue"]').type("ab");
  // cy.get('button[name="Добавить в head"]').should("not.be.disabled").click();

  // cy.get("li")
  //   .first()
  //   .within(() => {
  //     cy.get('[data-testid="head"]')
  //       .first()
  //       .within(() => {
  //         cy.get('[data-testid="circle"]')
  //           .should("contain.text", "ab")
  //           .and("have.css", "border", "4px solid rgb(210, 82, 225)");
  //       });
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .should("have.length", "5")
  //   .first()
  //   .within(() => {
  //     cy.get('[data-testid="head"]').should("have.text", "head");
  //     cy.get('[data-testid="circle"]').should(
  //       "have.css",
  //       "border",
  //       "4px solid rgb(127, 224, 81)"
  //     );
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .first()
  //   .within(() => {
  //     cy.get('[data-testid="circle"]').should(
  //       "have.css",
  //       "border",
  //       "4px solid rgb(0, 50, 255)"
  //     );
  //   });
  // });

  // it("should corectly add element to tail", () => {
  // cy.clock();
  // cy.get('input[name="inputValue"]').type("bc");
  // cy.get('button[name="Добавить в tail"]').should("not.be.disabled").click();

  // cy.get("li")
  //   .last()
  //   .within(() => {
  //     cy.get('[data-testid="head"]')
  //       .first()
  //       .within(() => {
  //         cy.get('[data-testid="circle"]')
  //           .should("contain.text", "bc")
  //           .and("have.css", "border", "4px solid rgb(210, 82, 225)");
  //       });
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .should("have.length", "5")
  //   .last()
  //   .within(() => {
  //     cy.get('[data-testid="tail"]').should("have.text", "tail");
  //     cy.get('[data-testid="circle"]').should(
  //       "have.css",
  //       "border",
  //       "4px solid rgb(127, 224, 81)"
  //     );
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .last()
  //   .within(() => {
  //     cy.get('[data-testid="circle"]').should(
  //       "have.css",
  //       "border",
  //       "4px solid rgb(0, 50, 255)"
  //     );
  //   });
  // });

  // it("should corectly delete element from head", () => {
  // cy.clock();
  // cy.get('button[name="Удалить из head"]').should("not.be.disabled").click();

  // cy.get("li")
  //   .should("have.length", 4)
  //   .first()
  //   .within(() => {
  //     cy.get('[data-testid="head"]').should("have.text", "head");
  //     cy.get('[data-testid="circle"]').should("contain.text", "");
  //     cy.get('[data-testid="tail"]')
  //       .first()
  //       .within(() => {
  //         cy.get('[data-testid="circle"]')
  //           .should("contain.text", "12")
  //           .and("have.css", "border", "4px solid rgb(210, 82, 225)");
  //       });
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .should("have.length", "3")
  //   .first()
  //   .within(() => {
  //     cy.get('[data-testid="head"]').should("have.text", "head");
  //     cy.get('[data-testid="circle"]')
  //       .should("have.css", "border", "4px solid rgb(0, 50, 255)")
  //       .and("have.text", "13");
  //   });
  // });

  // it("should corectly delete element from tail", () => {
  //   cy.clock();
  //   cy.get('button[name="Удалить из tail"]').should("not.be.disabled").click();

  //   cy.get("li")
  //     .should("have.length", 4)
  //     .last()
  //     .within(() => {
  //       cy.get('[data-testid="circle"]').should("contain.text", "");
  //       cy.get('[data-testid="tail"]')
  //         .first()
  //         .within(() => {
  //           cy.get('[data-testid="circle"]')
  //             .should("contain.text", "15")
  //             .and("have.css", "border", "4px solid rgb(210, 82, 225)");
  //         });
  //     });

  //   cy.tick(500);

  //   cy.get("li")
  //     .should("have.length", "3")
  //     .last()
  //     .within(() => {
  //       cy.get('[data-testid="tail"]').should("have.text", "tail");
  //       cy.get('[data-testid="circle"]')
  //         .should("have.css", "border", "4px solid rgb(0, 50, 255)")
  //         .and("have.text", "14");
  //     });
  // });

  // it("should corectly add element by index", () => {
  // cy.clock();
  // cy.get('input[name="inputValue"]').should("have.value", "").type("55");
  // cy.get('input[name="inputIndex"]').should("have.value", "").type("2");
  // cy.get('button[name="Добавить по индексу"]')
  //   .should("not.be.disabled")
  //   .click();

  // cy.get("li")
  //   .should("have.length", 4)
  //   .each(($li, index) => {
  //     if (index === 0) {
  //       cy.wrap($li).within(() => {
  //         cy.get('[data-testid="head"]')
  //           .first()
  //           .within(() => {
  //             cy.get('[data-testid="circle"]')
  //               .should("contain.text", "55")
  //               .and("have.css", "border", "4px solid rgb(210, 82, 225)");
  //           });
  //       });
  //     }
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .should("have.length", 4)
  //   .each(($li, index) => {
  //     if (index === 0) {
  //       cy.wrap($li).within(() => {
  //         cy.get('[data-testid="head"]').should("have.text", "head");
  //         cy.get('[data-testid="circle"]').should(
  //           "have.css",
  //           "border",
  //           "4px solid rgb(210, 82, 225)"
  //         );
  //       });
  //     }
  //     if (index === 1) {
  //       cy.wrap($li).within(() => {
  //         cy.wrap($li).within(() => {
  //           cy.get('[data-testid="head"]')
  //             .first()
  //             .within(() => {
  //               cy.get('[data-testid="circle"]')
  //                 .should("contain.text", "55")
  //                 .and("have.css", "border", "4px solid rgb(210, 82, 225)");
  //             });
  //         });
  //       });
  //     }
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .should("have.length", 4)
  //   .each(($li, index) => {
  //     if (index === 1) {
  //       cy.wrap($li).within(() => {
  //         cy.get('[data-testid="head"]').should("have.text", "");
  //         cy.get('[data-testid="circle"]').should(
  //           "have.css",
  //           "border",
  //           "4px solid rgb(210, 82, 225)"
  //         );
  //       });
  //     }
  //     if (index === 2) {
  //       cy.wrap($li).within(() => {
  //         cy.wrap($li).within(() => {
  //           cy.get('[data-testid="head"]')
  //             .first()
  //             .within(() => {
  //               cy.get('[data-testid="circle"]')
  //                 .should("contain.text", "55")
  //                 .and("have.css", "border", "4px solid rgb(210, 82, 225)");
  //             });
  //         });
  //       });
  //     }
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .should("have.length", 5)
  //   .each(($li, index) => {
  //     if (index === 2) {
  //       cy.wrap($li).within(() => {
  //         cy.get('[data-testid="head"]').should("have.text", "");
  //         cy.get('[data-testid="circle"]')
  //           .should("contain.text", "55")
  //           .and("have.css", "border", "4px solid rgb(127, 224, 81)");
  //       });
  //     }
  //     if (index === 3) {
  //       cy.wrap($li).within(() => {
  //         cy.get('[data-testid="head"]').should("have.text", "");
  //         cy.get('[data-testid="circle"]')
  //           .should("contain.text", "14")
  //           .and("have.css", "border", "4px solid rgb(0, 50, 255)");
  //       });
  //     }
  //   });

  // cy.tick(500);

  // cy.get("li")
  //   .should("have.length", 5)
  //   .each(($li, index) => {
  //     if (index === 2) {
  //       cy.wrap($li).within(() => {
  //         cy.get('[data-testid="circle"]')
  //           .should("contain.text", "55")
  //           .and("have.css", "border", "4px solid rgb(0, 50, 255)");
  //       });
  //     }
  //   });
  // });

  it("should corectly delete element by index", () => {
    cy.clock();
    cy.get('input[name="inputIndex"]').should("have.value", "").type("2");
    cy.get('button[name="Удалить по индексу"]')
      .should("not.be.disabled")
      .click();

    cy.get("li")
      .should("have.length", 4)
      .each(($li, index) => {
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="head"]').should("have.text", "head");
            cy.get('[data-testid="circle"]').should(
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
        if (index === 0) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="head"]').should("have.text", "head");
            cy.get('[data-testid="circle"]').should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          });
        }
        if (index === 1) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]').should(
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
            cy.get('[data-testid="circle"]')
              .should("contain.text", "")
              .and("have.css", "border", "4px solid rgb(0, 50, 255)");

            cy.get('[data-testid="tail"]')
              .first()
              .within(() => {
                cy.get('[data-testid="circle"]')
                  .should("contain.text", "14")
                  .and("have.css", "border", "4px solid rgb(210, 82, 225)");
              });
          });
        }
      });

    cy.tick(500);

    cy.get("li")
      .should("have.length", 3)
      .each(($li, index) => {
        if (index === 2) {
          cy.wrap($li).within(() => {
            cy.get('[data-testid="circle"]')
              .should("have.text", "15")
              .and("have.css", "border", "4px solid rgb(0, 50, 255)");
          });
        }
      });
  });
});
