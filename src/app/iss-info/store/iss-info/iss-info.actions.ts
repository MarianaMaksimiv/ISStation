import { createAction, props } from "@ngrx/store";
import { IssInfo, IssSavedInfo } from "../../models/iss-info";

export const fetchIssPosition = createAction(
    '[ISS] fetch iss position'
)
export const fetchIssPositionSuccess = createAction(
    '[ISS] fetch iss position success',
    props<{issInfo: IssInfo}>()
)

export const saveIssPosition = createAction(
    '[ISS] save iss position',
    props<{issSavedInfo: IssSavedInfo}>()
)

export const deleteIssPosition = createAction(
    '[ISS] delete iss position',
    props<{position: IssSavedInfo}>()
)

export const restoreDeletedPosition = createAction(
    '[ISS] restore deleted position'
)

export const clickPosition = createAction(
    '[ISS] click position',
    props<{clickedItem: IssSavedInfo}>()
)

export const selectPosition = createAction(
    '[ISS] select position',
    props<{savedItem: IssSavedInfo}>()
)

export const unselectPosition = createAction(
    '[ISS] unselect position',
)

export const saveFilterValue = createAction(
    '[ISS] save filter value',
    props<{filterValue: string}>()
)

export const filterSavedPositions = createAction(
    '[ISS] filter saved positions',
    props<{filterValue: string, savedPosition: IssSavedInfo}>()
)

export const toggleSidebar = createAction(
    '[ISS] toggle sidebar',
)

export const closeSidebar = createAction(
    '[ISS] close sidebar',
)
