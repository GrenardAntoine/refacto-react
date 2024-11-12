import { AppState } from "../store";

export function getDomains(state: AppState): string[] {
  return state.domains;
}
