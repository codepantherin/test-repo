import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutPage from "../app/about/page";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...rest
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={typeof href === "string" ? href : "#"} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return { __esModule: true, default: MockLink };
});

describe("AboutPage", () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  it("renders the hero heading", () => {
    const heading = screen.getByRole("heading", { level: 1, name: /about us/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the hero introductory paragraph", () => {
    expect(
      screen.getByText(/we are a team of dedicated professionals/i)
    ).toBeInTheDocument();
  });

  it("renders the company overview section", () => {
    expect(
      screen.getByRole("heading", { level: 2, name: /who we are/i })
    ).toBeInTheDocument();
  });

  it("renders the mission and vision section", () => {
    expect(screen.getByText(/^our mission$/i)).toBeInTheDocument();
    expect(screen.getByText(/^our vision$/i)).toBeInTheDocument();
  });

  it("renders the why choose us section with key points", () => {
    expect(
      screen.getByRole("heading", { level: 2, name: /why choose us/i })
    ).toBeInTheDocument();

    const keyPoints = screen.getAllByRole("listitem");
    expect(keyPoints.length).toBeGreaterThanOrEqual(3);
  });

  it("renders a call-to-action section linking to the contact page", () => {
    const links = screen.getAllByRole("link");
    const contactLinks = links.filter(
      (link) => link.getAttribute("href") === "/contact"
    );
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it("renders the CTA heading", () => {
    expect(
      screen.getByRole("heading", { level: 2, name: /ready to work with us\?/i })
    ).toBeInTheDocument();
  });
});
