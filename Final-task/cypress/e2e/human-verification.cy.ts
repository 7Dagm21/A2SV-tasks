/// <reference types="cypress" />

// Human verification (OTP) flow tests
// Ensures UI parity with original design & functional verification logic

describe("Human Verification Page", () => {
  const visit = (email?: string) => {
    const path = `/verify${email ? `?email=${encodeURIComponent(email)}` : ""}`;
    cy.log(`Visiting ${path}`);
    cy.visit(path);
  };

  it("renders initial layout", () => {
    visit();
    cy.get('[data-testid="hv-heading"]').contains("human");
    cy.get('[data-testid="hv-begin"]').should("be.visible");
    cy.screenshot("hv-initial");
  });

  it("progresses to OTP stage after clicking Begin", () => {
    visit("user@example.com");
    cy.get('[data-testid="hv-begin"]').click();
    cy.get('[data-testid="hv-otp-stage"]').should("be.visible");
    cy.get('[data-testid="hv-verify"]').should("be.disabled");
    cy.screenshot("hv-otp-stage");
  });

  it("enables verify button after 4 digits and simulates success (no email)", () => {
    visit();
    cy.get('[data-testid="hv-begin"]').click();
    // The OTP library renders a hidden full-length input over the visual slots. Target it directly.
    cy.get('input[data-input-otp="true"]').as("otpHidden");
    cy.get("@otpHidden").type("1234", { delay: 50 });
    cy.get('[data-testid="hv-verify"]').should("not.be.disabled").click();
    cy.get('[data-testid="hv-success"]').should("be.visible");
    cy.screenshot("hv-success");
  });
});
