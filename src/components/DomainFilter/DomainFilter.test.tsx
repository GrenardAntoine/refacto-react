import { describe, it, expect } from "vitest";

import DomainFilter from "./DomainFilter.component";
import userEvent from "@testing-library/user-event";
import React, { render, screen } from "@testing-library/react";
import { DomainsType } from "../../types";

describe("DomainFilter Component", () => {
  const sampleDomains: DomainsType = {
    countries: ["US", "FR", "EN"],
    classifications: ["OK", "NK", "BL"],
    subClassifications: ["WOK", "WOL", "NPP", "NRP"],
  };

  // TODO: remove old useless tests
  describe("DomainFilter", () => {
    it("should allow the user to filter", () => {
      render(
        <DomainFilter
          domains={{
            countries: ["do"],
            classifications: ["OK"],
            subClassifications: ["WOK"],
          }}
        />,
      );

      expect(screen.getAllByRole("listbox")).toHaveLength(3);
    });

    it("should render", async () => {
      render(
        <DomainFilter
          domains={{
            countries: ["do"],
            classifications: ["OK"],
            subClassifications: ["WOK"],
          }}
        />,
      );

      expect(await screen.findByText("do")).toBeTruthy();
    });
  });

  describe("Domain Format Parsing", () => {
    it("should correctly parse country codes from domains", () => {
      render(<DomainFilter domains={sampleDomains} />);

      const countrySelect = screen.getAllByRole("listbox")[0];
      const options = countrySelect.getElementsByTagName("option");

      expect(options).toHaveLength(3); // US, FR, EN
      const values = Array.from(options).map((option) => option.value);
      expect(values).toEqual(expect.arrayContaining(["US", "FR", "EN"]));
    });

    it("should correctly parse classifications from domains", () => {
      render(<DomainFilter domains={sampleDomains} />);

      const classificationSelect = screen.getAllByRole("listbox")[1];
      const options = classificationSelect.getElementsByTagName("option");

      expect(options).toHaveLength(3); // OK, NK, BL
      const values = Array.from(options).map((option) => option.value);
      expect(values).toEqual(expect.arrayContaining(["OK", "NK", "BL"]));
    });

    it("should correctly parse subclassifications from domains", () => {
      render(<DomainFilter domains={sampleDomains} />);

      const subClassificationSelect = screen.getAllByRole("listbox")[2];
      const options = subClassificationSelect.getElementsByTagName("option");

      expect(options).toHaveLength(4); // WOK, WOL, NPP, NRP
      const values = Array.from(options).map((option) => option.value);
      expect(values).toEqual(
        expect.arrayContaining(["WOK", "WOL", "NPP", "NRP"]),
      );
    });

    it("should handle one classification and show only distinct options", () => {
      const domainsWithDuplicates: DomainsType = {
        countries: ["US", "FR", "EN"],
        classifications: ["OK"],
        subClassifications: ["WOK", "WOL", "NPP"],
      };

      render(<DomainFilter domains={domainsWithDuplicates} />);

      const classificationSelect = screen.getAllByRole("listbox")[1];
      const options = classificationSelect.getElementsByTagName("option");

      expect(options).toHaveLength(1); // Only OK should appear once
      expect(options[0].value).toBe("OK");
    });

    it("should handle one subclassification and show only distinct options", () => {
      const domainsWithDuplicates: DomainsType = {
        countries: ["US", "FR", "EN"],
        classifications: ["OK", "NK", "BL"],
        subClassifications: ["WOL"],
      };

      render(<DomainFilter domains={domainsWithDuplicates} />);

      const subClassificationSelect = screen.getAllByRole("listbox")[2];
      const options = subClassificationSelect.getElementsByTagName("option");

      expect(options).toHaveLength(1); // Only WOL should appear once
      expect(options[0].value).toBe("WOL");
    });
  });

  describe(" Selection Functionality", () => {
    it("should allow country selection", async () => {
      const user = userEvent.setup();
      render(<DomainFilter domains={sampleDomains} />);

      const countrySelect = screen.getAllByRole("listbox")[0];
      const options = countrySelect.getElementsByTagName("option");

      await user.selectOptions(countrySelect, ["US"]);

      expect(options[0].selected).toBe(true);
      expect(options[1].selected).toBe(false);
      expect(options[2].selected).toBe(false);
    });

    it("should allow classification selection", async () => {
      const user = userEvent.setup();
      render(<DomainFilter domains={sampleDomains} />);

      const classificationSelect = screen.getAllByRole("listbox")[1];
      const options = classificationSelect.getElementsByTagName("option");

      await user.selectOptions(classificationSelect, ["OK"]);

      expect(options[0].selected).toBe(true);
      expect(options[1].selected).toBe(false);
      expect(options[2].selected).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty domains array", () => {
      render(
        <DomainFilter
          domains={{
            countries: [],
            classifications: [],
            subClassifications: [],
          }}
        />,
      );

      const selects = screen.getAllByRole("listbox");

      selects.forEach((select) => {
        expect(select.getElementsByTagName("option")).toHaveLength(0);
      });
    });

    it("should handle undefined domains prop", () => {
      render(<DomainFilter />);

      const selects = screen.getAllByRole("listbox");

      selects.forEach((select) => {
        expect(select.getElementsByTagName("option")).toHaveLength(0);
      });
    });
  });
});
