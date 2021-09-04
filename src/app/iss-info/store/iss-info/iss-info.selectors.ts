import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IssInfoState, ISS_INFO_REDUCER_NODE } from "./iss-info.reducer";

export const selectFeature = createFeatureSelector<IssInfoState>(ISS_INFO_REDUCER_NODE)

export const selectState = createSelector(
    selectFeature,
    (state) => state
)

export const selectCurrentInfo = createSelector(
    selectFeature,
    (state) => state.currentInfo
)

export const selectSavedIssPositions = createSelector(
    selectFeature,
    (state) => state.savedIssPositions
)

export const selectSelectedPositionName = createSelector(
    selectFeature,
    (state) => state.selectedPositionName
)

export const selectFilteredValue = createSelector(
    selectFeature,
    (state) => state.filterValue
)

export const selectSidebarOpened = createSelector(
    selectFeature,
    (state) => state.sidebarOpened
)
