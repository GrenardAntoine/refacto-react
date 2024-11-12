// This file has to be left untouched

import { ReceiveDomainsAction, RECEIVE_DOMAINS } from "./types";

export const receiveDomains = (domains: string[]): ReceiveDomainsAction => ({
  type: RECEIVE_DOMAINS,
  domains,
});
