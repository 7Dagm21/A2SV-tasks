import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

// Mock containers
let mockAuth: any = {};
let mockBookmark: any = {};

// We'll set mutable mock state before each test and require component after mocks are defined.
jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => mockAuth,
}));
jest.mock("../contexts/BookmarkContext", () => ({
  useBookmark: () => mockBookmark,
}));

// Import component AFTER mocks so it uses mocked hooks
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BookmarkButton } = require("../components/BookmarkButton");

const user = {
  id: "1",
  name: "User",
  email: "u@test",
  role: "user",
  profileComplete: true,
};

function setup({
  authed = false,
  bookmarked = false,
  toggle = jest.fn(() => Promise.resolve()),
} = {}) {
  mockAuth = {
    user: authed ? user : null,
    isAuthenticated: authed,
    isLoading: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
  };
  mockBookmark = {
    bookmarkedJobs: new Set(bookmarked ? ["job-1"] : []),
    isLoading: false,
    error: null,
    toggleBookmark: toggle,
    isBookmarked: (id: string) => (bookmarked && id === "job-1") || false,
    refreshBookmarks: jest.fn(),
  };
  return { toggle };
}

describe("BookmarkButton", () => {
  const onAuthRequired = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("unauthenticated click triggers callback and feedback", async () => {
    setup({ authed: false });
    render(<BookmarkButton jobId="job-2" onAuthRequired={onAuthRequired} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onAuthRequired).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByText(/login to bookmark/i)).toBeInTheDocument()
    );
  });

  test("authenticated click calls toggleBookmark once", async () => {
    const { toggle } = setup({ authed: true });
    render(<BookmarkButton jobId="job-2" onAuthRequired={onAuthRequired} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(toggle).toHaveBeenCalledWith("job-2"));
    expect(onAuthRequired).not.toHaveBeenCalled();
  });

  test("toggle error still calls toggleBookmark", async () => {
    const failing = jest.fn(() => Promise.reject(new Error("fail")));
    setup({ authed: true, toggle: failing });
    render(<BookmarkButton jobId="job-2" onAuthRequired={onAuthRequired} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(failing).toHaveBeenCalledTimes(1));
  });
});
