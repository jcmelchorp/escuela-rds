import { createReducer, on } from "@ngrx/store";
import { loadApp } from "@rds-store/app/actions/app.actions";
import { loadConfigSuccess } from "./core.actions";

export const configKey = 'config';

export interface ConfigurationState {
  defaultPeriod: { id: string, cicle: string };
}
export const initialState: ConfigurationState = {
  defaultPeriod: { id: '20212022', cicle: '2021-2022' }
};
export const configReducer = createReducer<ConfigurationState>(
  initialState,
  on(loadConfigSuccess, (state, action) => {
    return {
      ...state,
      defaultPeriod: action.defaultPeriod
    };
  })
);
