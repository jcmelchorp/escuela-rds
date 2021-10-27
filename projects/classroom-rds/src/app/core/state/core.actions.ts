import { createAction, props } from "@ngrx/store";

export const loadConfig = createAction(
  '[App] Load configs',
);
export const loadConfigSuccess = createAction(
  '[App] Load configs success',
  props<{ defaultPeriod: { id: string, cicle: string } }>()
);
export const loadConfigFail = createAction(
  '[App] Load configs fail',
  props<{ error: any }>()
);
