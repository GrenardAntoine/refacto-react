import { DomainsType } from "../../types";
import { convertDomainsStringToDomainsType } from "../../utils";
import { AppState } from "../store";

export const getDomains = (state: AppState): DomainsType => {
  return convertDomainsStringToDomainsType(state.domains);
};
