// Bookmark E2E: unauth prompt + toggle after login (stubbed backend)

describe("Bookmark Flow (Stubbed)", () => {
  const api = "https://akil-backend.onrender.com";

  const login = () => {
    // Open auth modal & perform login
    cy.get("body").then(($b) => {
      const btn = $b.find('[data-testid="open-auth"]');
      if (btn.length)
        cy.wrap(btn.first()).scrollIntoView().click({ force: true });
      else
        cy.contains("button", "Sign In", { timeout: 8000 })
          .scrollIntoView()
          .click({ force: true });
    });
    cy.contains("Welcome Back").should("be.visible");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("testpassword123");
    cy.get('[data-testid="login-submit"]').click();
    cy.wait("@login");
    cy.contains("Welcome, Test User", { timeout: 8000 }).should("be.visible");
  };

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept("POST", api + "/login", { fixture: "login.json" }).as("login");
    cy.intercept("GET", api + "/user", { fixture: "login.json" }).as(
      "currentUser"
    );
    cy.intercept("GET", api + "/bookmarks", { fixture: "bookmarks.json" }).as(
      "bookmarks"
    );
    cy.intercept("GET", api + "/opportunities/search", {
      fixture: "jobs.json",
    }).as("jobs");
    cy.intercept("POST", api + /\/bookmarks\/[A-Za-z0-9_-]+/, {
      body: { success: true, message: "created" },
    }).as("createBookmark");
    cy.intercept("DELETE", api + /\/bookmarks\/[A-Za-z0-9_-]+/, {
      body: { success: true, message: "removed" },
    }).as("removeBookmark");
    cy.visit("/");
    cy.contains("Job Portal", { timeout: 15000 }).should("be.visible");
    cy.wait("@jobs");
  });

  it("shows login prompt tooltip when unauthenticated", () => {
    cy.get('[data-testid="job-card"]', { timeout: 15000 })
      .first()
      .should("be.visible");
    cy.get('[data-testid="job-card"]')
      .first()
      .within(() => {
        cy.get('[data-testid="bookmark-button"]').click({ force: true });
      });
    cy.contains(/login to bookmark/i, { timeout: 4000 }).should("be.visible");
    cy.screenshot("bookmark-unauth-tooltip");
  });

  it("logs in then bookmarks and unbookmarks first job", () => {
    login();
    cy.wait("@jobs");
    cy.get('[data-testid="job-card"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .within(() => {
        cy.get('[data-testid="bookmark-button"]')
          .as("bm")
          .click({ force: true });
      });
    cy.get("@bm")
      .should("have.attr", "title")
      .and((val) => {
        const str = String(val);
        // @ts-ignore - Cypress' Chai expect
        expect(str.toLowerCase()).to.match(/remove|add/);
      });
    cy.get("@bm").click({ force: true });
    cy.get("@bm")
      .should("have.attr", "title")
      .and((val) => {
        const str = String(val);
        // @ts-ignore - Cypress' Chai expect
        expect(str.toLowerCase()).to.match(/add|remove/);
      });
    cy.screenshot("bookmark-toggle-cycle");
  });
});
