import { describe, it, expect } from 'vitest';

import domainsReducer from "./reducer";
import { receiveDomains } from "./actions";
import { DomainsState } from "./types";

describe("reducers", () => {
  describe("domains", () => {
    it("should initialize to an empty list", () => {
      const unknownAction: any = {};
      const newState = domainsReducer(undefined, unknownAction);

      expect(newState).toEqual([]);
    });

    it("should store the domains", () => {
      const oldState: DomainsState = [];
      const action = receiveDomains(["do", "main"]);
      const newState = domainsReducer(oldState, action);

      expect(newState).toEqual(["do", "main"]);
    });
  });
});
