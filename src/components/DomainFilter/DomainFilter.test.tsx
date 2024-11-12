import DomainFilter from "./DomainFilter.component";
import React, { render, screen } from "@testing-library/react";

describe("components", () => {
  describe("DomainFilter", () => {
    it("should allow the user to filter", () => {
      render(<DomainFilter domains={["do"]} />);

      expect(screen.getAllByRole("listbox")).toHaveLength(3);
    });

    it("should render", async () => {
      render(<DomainFilter domains={["do"]} />);

      expect(await screen.findByText("do")).toBeTruthy();
    });
  });
});
