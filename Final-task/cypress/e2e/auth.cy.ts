// Auth E2E: registration + login (stubbed backend)

describe("Authentication Flow (Stubbed)", () => {
  const api = "https://akil-backend.onrender.com";

  const openAuthModal = () => {
    cy.get('button[data-testid="open-auth"], button:contains("Sign In")', {
      timeout: 8000,
    })
      .first()
      .click({ force: true });
  };

  beforeEach(() => {
    cy.intercept("POST", api + "/login", { fixture: "login.json" }).as("login");
    cy.intercept("POST", api + "/signup", { fixture: "register.json" }).as(
      "register"
    );
    cy.intercept("GET", api + "/user", { fixture: "login.json" }).as(
      "currentUser"
    );
    cy.intercept("GET", api + "/bookmarks", { fixture: "bookmarks.json" }).as(
      "bookmarks"
    );
    // Ensure clean auth state
    cy.clearLocalStorage();
    cy.visit("/");
    cy.contains("Job Portal", { timeout: 15000 }).should("be.visible");
  });

  it("registers a new user", () => {
    // Prefer direct Sign Up button when registering
    cy.contains("button", "Sign Up").click({ force: true });
    // If modal opens in login mode, switch to register
    cy.get("body").then(($b) => {
      if ($b.find('[data-testid="switch-to-register"]').length) {
        cy.get('[data-testid="switch-to-register"]').click();
      }
    });
    cy.get('[data-testid="register-heading"]').should("be.visible");
    cy.get('input[name="name"]').should("be.visible").type("Test User");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("testpassword123");
    cy.get('input[name="confirmPassword"]').type("testpassword123");
    cy.get('[data-testid="register-continue"]').click();
    cy.wait("@register");
    cy.contains("Welcome, Test User", { timeout: 8000 }).should("be.visible");
    cy.screenshot("auth-register-success");
  });

  it("logs in an existing user", () => {
    openAuthModal();
    cy.get('input[name="email"]')
      .should("be.visible")
      .type("testuser@example.com");
    cy.get('input[name="password"]').type("testpassword123");
    cy.get('[data-testid="login-submit"]').click();
    cy.wait("@login");
    cy.contains("Welcome, Test User", { timeout: 8000 }).should("be.visible");
    cy.screenshot("auth-login-success");
  });
});
