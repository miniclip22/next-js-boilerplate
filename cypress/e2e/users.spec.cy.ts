describe("Setup Axios Headers", () => {
  beforeEach(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
      },
    };
  });
});

describe("User tests", () => {
  it("is able to get all valid users", () => {
    cy.request("http://localhost:3000/api/users").then((response: any) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("users");
      expect(response.body.users).to.have.length.greaterThan(0);
    });
  });
});

export {};
