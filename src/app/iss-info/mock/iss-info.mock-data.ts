import { IssInfo, IssSavedInfo } from "../models/iss-info";
import { IssInfoState } from "../store/iss-info/iss-info.reducer";

export const ISS_INFO_MOCK: IssInfo = {
    iss_position: {
        latitude: 0,
        longitude: 0
    },
    timestamp: 0
}

export const ISS_SAVED_INFO_ITEM: IssSavedInfo = {
    iss_position: {
        latitude: 0,
        longitude: 0
    },
    timestamp: 0,
    name: "Position 0"
}

export const ISS_SAVED_INFO: IssSavedInfo[] = [
    {
        iss_position: {
            latitude: 0,
            longitude: 0
        },
        timestamp: 0,
        name: "Position 0"
    },
    {
        iss_position: {
            latitude: 1,
            longitude: 1
        },
        timestamp: 1,
        name: "Position 1"
    },
    {
        iss_position: {
            latitude: 2,
            longitude: 2
        },
        timestamp: 2,
        name: "Position 2"
    }
]

export const INITIAL_STATE_MOCK: IssInfoState = {
    savedIssPositions: ISS_SAVED_INFO,
    currentInfo: {
      iss_position: {
        latitude: 0,
        longitude: 0,
      },
      timestamp: 0,
    },
    selectedPositionName: null,
    lastDeletedItem: null,
    filterValue: '',
    sidebarOpened: true
};