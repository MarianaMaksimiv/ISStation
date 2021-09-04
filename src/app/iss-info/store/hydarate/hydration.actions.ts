import { createAction, props } from "@ngrx/store";
import { IssInfoState } from "../iss-info/iss-info.reducer";


export const hydrate = createAction("[Hydration] Hydrate");

export const hydrateSuccess = createAction(
  "[Hydration] Hydrate Success",
  props<{ state: {iss_info: IssInfoState} }>()
);

export const hydrateFailure = createAction("[Hydration] Hydrate Failure");