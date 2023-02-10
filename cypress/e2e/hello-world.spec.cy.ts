describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("Loading all hello worlds", () => {
  it("is able to get all hello worlds", () => {
    cy.request("http://localhost:3000/api/hello-world").then(
      (response: any) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(3);
      }
    );
  });
});
