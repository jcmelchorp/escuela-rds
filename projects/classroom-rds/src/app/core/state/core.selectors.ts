import { createFeatureSelector, createSelector } from "@ngrx/store";
import { configKey, ConfigurationState } from './core.reducer';

export const selectConfigState = createFeatureSelector<ConfigurationState>(
  configKey
);
export const defaultPeriod = createSelector(
  selectConfigState,
  (state: ConfigurationState): { id: string, cicle: string } => state.defaultPeriod
);
