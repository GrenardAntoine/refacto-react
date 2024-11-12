import { describe, it, expect } from 'vitest';

import DomainFilter from "./DomainFilter.component";
import userEvent from '@testing-library/user-event';
import React, { render, screen } from "@testing-library/react";

describe("DomainFilter Component", () => {
  const sampleDomains = [
    "US_OK-WOK",
    "FR_NK-WOL",
    "FR_OK-NPP",
    "EN_NK-NRP",
    "EN_BL-WOL"
  ];

  // TODO: remove old useless tests
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

  describe("Domain Format Parsing", () => {
    it("should correctly parse country codes from domains", () => {
      render(<DomainFilter domains={sampleDomains} />);
      
      const countrySelect = screen.getAllByRole("listbox")[0];
      const options = countrySelect.getElementsByTagName("option");
      
      expect(options).toHaveLength(3); // US, FR, EN
      const values = Array.from(options).map(option => option.value);
      expect(values).toEqual(expect.arrayContaining(["US", "FR", "EN"]));
    });

    it("should correctly parse classifications from domains", () => {
      render(<DomainFilter domains={sampleDomains} />);
      
      const classificationSelect = screen.getAllByRole("listbox")[1];
      const options = classificationSelect.getElementsByTagName("option");
      
      expect(options).toHaveLength(3); // OK, NK, BL
      const values = Array.from(options).map(option => option.value);
      expect(values).toEqual(expect.arrayContaining(["OK", "NK", "BL"]));
    });

    it("should correctly parse subclassifications from domains", () => {
      render(<DomainFilter domains={sampleDomains} />);
      
      const subClassificationSelect = screen.getAllByRole("listbox")[2];
      const options = subClassificationSelect.getElementsByTagName("option");
      
      expect(options).toHaveLength(4); // WOK, WOL, NPP, NRP
      const values = Array.from(options).map(option => option.value);
      expect(values).toEqual(expect.arrayContaining(["WOK", "WOL", "NPP", "NRP"]));
    });

    it("should handle duplicate classifications and show only distinct options", () => {
      const domainsWithDuplicates = [
        "US_OK-WOK",
        "FR_OK-WOL", // Duplicate OK classification
        "EN_OK-NPP"  // Duplicate OK classification
      ];
      
      render(<DomainFilter domains={domainsWithDuplicates} />);
      
      const classificationSelect = screen.getAllByRole("listbox")[1];
      const options = classificationSelect.getElementsByTagName("option");
      
      expect(options).toHaveLength(1); // Only OK should appear once
      expect(options[0].value).toBe("OK");
    });

    it("should handle duplicate subclassifications and show only distinct options", () => {
      const domainsWithDuplicates = [
        "US_OK-WOL",
        "FR_NK-WOL", // Duplicate WOL subclassification
        "EN_BL-WOL"  // Duplicate WOL subclassification
      ];
      
      render(<DomainFilter domains={domainsWithDuplicates} />);
      
      const subClassificationSelect = screen.getAllByRole("listbox")[2];
      const options = subClassificationSelect.getElementsByTagName("option");
      
      expect(options).toHaveLength(1); // Only WOL should appear once
      expect(options[0].value).toBe("WOL");
    });
  });

  describe("Multiple Selection Functionality", () => {
    it("should allow multiple country selections", async () => {
      const user = userEvent.setup();
      render(<DomainFilter domains={sampleDomains} />);
      
      const countrySelect = screen.getAllByRole("listbox")[0];
      const options = countrySelect.getElementsByTagName("option");
      
      // Select multiple countries
      await user.click(options[0]); // First country
      await user.click(options[1]); // Second country
      
      expect(options[0].selected).toBe(true);
      expect(options[1].selected).toBe(true);
      expect(options[2].selected).toBe(false);
    });

    it("should allow multiple classification selections", async () => {
      const user = userEvent.setup();
      render(<DomainFilter domains={sampleDomains} />);
      
      const classificationSelect = screen.getAllByRole("listbox")[1];
      const options = classificationSelect.getElementsByTagName("option");
      
      // Select multiple classifications
      await user.click(options[0]); // First classification
      await user.click(options[1]); // Second classification
      
      expect(options[0].selected).toBe(true);
      expect(options[1].selected).toBe(true);
      expect(options[2].selected).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty domains array", () => {
      render(<DomainFilter domains={[]} />);
      
      const selects = screen.getAllByRole("listbox");
      
      selects.forEach(select => {
        expect(select.getElementsByTagName("option")).toHaveLength(0);
      });
    });

    it("should handle undefined domains prop", () => {
      render(<DomainFilter />);
      
      const selects = screen.getAllByRole("listbox");
      
      selects.forEach(select => {
        expect(select.getElementsByTagName("option")).toHaveLength(0);
      });
    });

    it("should handle malformed domain strings", () => {
      const malformedDomains = [
        "US_OK-WOK",
        "INVALID_DOMAIN",  // Malformed domain
        "FR_NK-WOL"
      ];
      
      render(<DomainFilter domains={malformedDomains} />);
      
      const [countrySelect, classificationSelect, subClassificationSelect] = 
        screen.getAllByRole("listbox");
      
      // Should only process valid domains
      expect(countrySelect.getElementsByTagName("option")).toHaveLength(2);
      expect(classificationSelect.getElementsByTagName("option")).toHaveLength(2);
      expect(subClassificationSelect.getElementsByTagName("option")).toHaveLength(2);
    });
  });
});
