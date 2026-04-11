import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pipeline readiness message", () => {
  render(<App />);
  expect(screen.getByText(/pipeline ready/i)).toBeInTheDocument();
});
