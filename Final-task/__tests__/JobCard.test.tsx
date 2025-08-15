import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { JobCard } from "../components/JobCard";
import type { TransformedJob } from "../types/api";

// Lightweight module mocks so JobCard's child BookmarkButton sees our context values
let mockAuth: any;
let mockBookmark: any;
jest.mock("../contexts/AuthContext", () => ({ useAuth: () => mockAuth }));
jest.mock("../contexts/BookmarkContext", () => ({
  useBookmark: () => mockBookmark,
}));

// Mock Next.js Link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

const job: TransformedJob = {
  id: "job-123",
  title: "Senior Software Engineer",
  company: "Tech Corp",
  description: "Build and scale platform.",
  responsibilities: [],
  ideal_candidate: { traits: [] },
  skills: [],
  about: {
    posted_on: "Dec 15, 2023",
    deadline: "Jan 15, 2024",
    location: "Remote",
    start_date: "Feb 1, 2024",
    end_date: "Jan 31, 2025",
    categories: ["Technology", "Software Development"],
    required_skills: [],
  },
  when_where: "Remote",
  image: "https://example.com/logo.png",
  logoUrl: "https://example.com/logo.png",
};

function setup({
  authed = false,
  bookmarked = false,
  toggle = jest.fn(() => Promise.resolve()),
} = {}) {
  mockAuth = { isAuthenticated: authed, user: authed ? { id: "u1" } : null };
  mockBookmark = {
    isBookmarked: (id: string) => bookmarked && id === job.id,
    toggleBookmark: toggle,
    bookmarkedJobs: new Set(bookmarked ? [job.id] : []),
    isLoading: false,
    error: null,
    refreshBookmarks: jest.fn(),
  };
  return { toggle };
}

describe("JobCard", () => {
  const onAuthRequired = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("renders core job info", () => {
    setup();
    render(<JobCard job={job} onAuthRequired={onAuthRequired} />);
    expect(screen.getByTestId("job-card")).toBeInTheDocument();
    expect(screen.getByText(job.title)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/)).toBeInTheDocument();
    expect(screen.getByTestId("job-description")).toHaveTextContent(
      job.description
    );
  });

  test("hides bookmark when showBookmark=false", () => {
    setup();
    render(
      <JobCard job={job} onAuthRequired={onAuthRequired} showBookmark={false} />
    );
    expect(screen.queryByTestId("bookmark-button")).not.toBeInTheDocument();
  });

  test("unauthenticated click triggers onAuthRequired only", async () => {
    const { toggle } = setup({ authed: false });
    render(<JobCard job={job} onAuthRequired={onAuthRequired} />);
    fireEvent.click(screen.getByTestId("bookmark-button"));
    expect(onAuthRequired).toHaveBeenCalled();
    expect(toggle).not.toHaveBeenCalled();
  });

  test("authenticated click calls toggleBookmark", async () => {
    const { toggle } = setup({ authed: true });
    render(<JobCard job={job} onAuthRequired={onAuthRequired} />);
    fireEvent.click(screen.getByTestId("bookmark-button"));
    await waitFor(() => expect(toggle).toHaveBeenCalledWith(job.id));
    expect(onAuthRequired).not.toHaveBeenCalled();
  });

  test("initial bookmarked state reflects in title attribute", () => {
    setup({ authed: true, bookmarked: true });
    render(<JobCard job={job} onAuthRequired={onAuthRequired} />);
    const btn = screen.getByTestId("bookmark-button");
    expect(btn).toHaveAttribute("title", "Remove from bookmarks");
  });
});
