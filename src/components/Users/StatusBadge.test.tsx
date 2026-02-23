import React from "react";
import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  describe("Positive Test Cases", () => {
    test("renders Active status correctly", () => {
      render(<StatusBadge status="Active" />);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    test("renders Inactive status correctly", () => {
      render(<StatusBadge status="Inactive" />);
      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });

    test("renders Pending status correctly", () => {
      render(<StatusBadge status="Pending" />);
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    test("renders Blacklisted status correctly", () => {
      render(<StatusBadge status="Blacklisted" />);
      expect(screen.getByText("Blacklisted")).toBeInTheDocument();
    });

    test("has correct class for Active status", () => {
      const { container } = render(<StatusBadge status="Active" />);
      const badge = container.querySelector(".status-badge");
      expect(badge).toHaveClass("status-badge--active");
    });

    test("has correct class for Inactive status", () => {
      const { container } = render(<StatusBadge status="Inactive" />);
      const badge = container.querySelector(".status-badge");
      expect(badge).toHaveClass("status-badge--inactive");
    });

    test("has correct class for Pending status", () => {
      const { container } = render(<StatusBadge status="Pending" />);
      const badge = container.querySelector(".status-badge");
      expect(badge).toHaveClass("status-badge--pending");
    });

    test("has correct class for Blacklisted status", () => {
      const { container } = render(<StatusBadge status="Blacklisted" />);
      const badge = container.querySelector(".status-badge");
      expect(badge).toHaveClass("status-badge--blacklisted");
    });
  });

  describe("Negative Test Cases", () => {
    test("renders without crashing for all valid statuses", () => {
      const statuses = [
        "Active",
        "Inactive",
        "Pending",
        "Blacklisted",
      ] as const;

      statuses.forEach((status) => {
        const { container } = render(<StatusBadge status={status} />);
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });
});
