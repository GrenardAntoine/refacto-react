import { DomainsState, DomainsAction, RECEIVE_DOMAINS } from "./types";

const initialState: DomainsState = [];

export function domainsReducer(
  state = initialState,
  action: DomainsAction,
): DomainsState {
  switch (action.type) {
    case RECEIVE_DOMAINS:
      return action.domains;
    default:
      return state;
  }
}

export default domainsReducer;
