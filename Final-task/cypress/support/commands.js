/**
 * Custom Cypress Commands for E2E Testing
 * Provides reusable commands for authentication and common actions.
 * IMPORTANT: Do NOT require('cypress') here (keeps browser bundle clean).
 */

// Authentication commands
Cypress.Commands.add("login", (email, password) => {
  cy.session(["login", email], () => {
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.contains("Welcome,").should("be.visible");
  });
});

// UI-driven login mirroring reference repo naming
Cypress.Commands.add("loginViaUI", () => {
  const email = "test@example.com";
  const password = "password123";
  cy.visit("/");
  cy.contains("Sign In").click();
  cy.get("form").should("be.visible");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Welcome,").should("be.visible");
});

Cypress.Commands.add("logout", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add("register", (name, email, password) => {
  cy.session(["register", email], () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.contains("Welcome,").should("be.visible");
  });
});

// Bookmark commands
Cypress.Commands.add("bookmarkJob", (jobIndex = 0) => {
  cy.get('[data-testid="job-card"]')
    .eq(jobIndex)
    .within(() => {
      cy.get('[data-testid="bookmark-button"]').click();
      cy.contains("Job added to bookmarks").should("be.visible");
    });
});

Cypress.Commands.add("unbookmarkJob", (jobIndex = 0) => {
  cy.get('[data-testid="job-card"]')
    .eq(jobIndex)
    .within(() => {
      cy.get('[data-testid="bookmark-button"]').click();
      cy.contains("Job removed from bookmarks").should("be.visible");
    });
});

// Navigation command
Cypress.Commands.add("visitJobDetails", (jobIndex = 0) => {
  cy.get('[data-testid="job-title"]').eq(jobIndex).click();
  cy.url().should("include", "/jobs/");
});

// Utility commands
Cypress.Commands.add("waitForJobsToLoad", () => {
  cy.get('[data-testid="job-card"]').should("be.visible");
  cy.get('[data-testid="job-card"]').should("have.length.at.least", 1);
});

Cypress.Commands.add("searchJobs", (searchTerm) => {
  cy.get('input[placeholder*="Search jobs"]').clear().type(searchTerm);
  cy.waitForJobsToLoad();
});
