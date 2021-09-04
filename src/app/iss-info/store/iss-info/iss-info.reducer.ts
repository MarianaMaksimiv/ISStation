
import { createReducer, on } from '@ngrx/store';
import { IssInfo, IssSavedInfo } from '../../models/iss-info';
import {
  closeSidebar,
  deleteIssPosition,
  fetchIssPositionSuccess,
  restoreDeletedPosition,
  saveFilterValue,
  saveIssPosition,
  selectPosition,
  toggleSidebar,
  unselectPosition,
} from './iss-info.actions';

export const ISS_INFO_REDUCER_NODE = 'iss-info';

export interface IssInfoState {
  savedIssPositions: IssSavedInfo[];
  currentInfo: IssInfo;
  selectedPositionName: string | null;
  lastDeletedItem: IssSavedInfo | null;
  filterValue: string | null;
  sidebarOpened: boolean;
}

export const initialState: IssInfoState = {
  savedIssPositions: [],
  currentInfo: {
    iss_position: {
      latitude: 0,
      longitude: 0,
    },
    timestamp: 0,
  
  },
  selectedPositionName: null,
  lastDeletedItem: null,
  filterValue: null,
  sidebarOpened: true
};
export const issInfoReducer = createReducer(
  initialState,
  on(fetchIssPositionSuccess, (state, { issInfo }) => ({
    ...state,
    currentInfo: issInfo,
  })),
  on(saveIssPosition, (state, { issSavedInfo }) => ({
    ...state,
    savedIssPositions: [...state.savedIssPositions, issSavedInfo].sort(
      (prevItem, curItem) => {
        return curItem.timestamp - prevItem.timestamp;
      }
    ),
  })),
  on(deleteIssPosition, (state, { position }) => ({
    ...state,
    savedIssPositions: state.savedIssPositions.filter(
      (positionItem) => positionItem.name !== position.name
    ),
    lastDeletedItem: position,
  })),
  on(selectPosition, (state, { savedItem }) => ({
    ...state,
    selectedPositionName: savedItem.name,
  })),
  on(unselectPosition, (state) => ({
    ...state,
    selectedPositionName: null,
  })),
  on(restoreDeletedPosition, (state) => {
    if (state.lastDeletedItem) {
      return {
        ...state,
        savedIssPositions: [
          ...state.savedIssPositions,
          state.lastDeletedItem,
        ].sort((prevItem, curItem) => {
          return curItem.timestamp - prevItem.timestamp;
        }),
        lastDeletedItem: null,
      };
    }
    return state;
  }),
  on(saveFilterValue, (state, {filterValue}) => ({
    ...state,
    filterValue
  })),
  on(toggleSidebar, (state) => ({
    ...state,
    sidebarOpened: !state.sidebarOpened
  })),
  on(closeSidebar, (state) => ({
    ...state,
    sidebarOpened: false
  })),
);
