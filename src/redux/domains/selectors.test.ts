import { describe, it, expect } from "vitest";

import { getDomains } from "./selectors";
import { AppState } from "../store";

describe("selectors", () => {
  const state: AppState = {
    domains: ["SU_PE-RTE", "ST_TE-STT"],
  };

  describe("getDomains", () => {
    // This describe must be left untouched, this selector is used on other parts of the application.
    it("should return the domains", () => {
      const domains = getDomains(state);

      expect(domains).toEqual({
        countries: ["SU", "ST"],
        classifications: ["PE", "TE"],
        subClassifications: ["RTE", "STT"],
      });
    });
  });
});
