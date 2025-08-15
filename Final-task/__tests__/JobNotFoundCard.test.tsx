// File removed: duplicate/unneeded test for bookmark task
// Jest Component Tests for JobNotFoundCard Component
// Tests rendering and user interactions for job not found scenarios
/**
 * Jest Component Tests for JobNotFoundCard Component
 * Tests rendering and user interactions for job not found scenarios
 */

import { render, screen } from "@testing-library/react";
import { JobNotFoundCard } from "../components/JobNotFoundCard";
// jest-dom matchers are loaded globally in jest.setup.js; no need to import again.

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
});

describe("JobNotFoundCard Component", () => {
  test("renders core structure", () => {
    render(<JobNotFoundCard />);
    (expect as any)(
      screen.getByTestId("job-not-found-card")
    ).toBeInTheDocument();
    (expect as any)(screen.getByText("Job Not Found")).toBeInTheDocument();
    (expect as any)(
      screen.getByText(
        "The job you're looking for doesn't exist or has been removed."
      )
    ).toBeInTheDocument();
    (expect as any)(screen.getByTestId("browse-jobs-link")).toHaveAttribute(
      "href",
      "/"
    );
  });

  test("renders job id and custom message", () => {
    render(
      <JobNotFoundCard
        jobId="abc-123"
        message="Custom error message"
        showBackButton={false}
      />
    );
    (expect as any)(screen.getByText("Job ID: abc-123")).toBeInTheDocument();
    (expect as any)(
      screen.getByText("Custom error message")
    ).toBeInTheDocument();
    (expect as any)(
      screen.queryByTestId("back-to-jobs-link")
    ).not.toBeInTheDocument();
  });
});
// End describe
