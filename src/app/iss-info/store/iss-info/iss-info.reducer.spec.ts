
import { ISS_INFO_MOCK, ISS_SAVED_INFO_ITEM } from '../../mock/iss-info.mock-data';

import * as IssInfoActions from './iss-info.actions';
import { issInfoReducer, initialState, IssInfoState } from './iss-info.reducer';

describe('IssInfoReducer', () => {
  let state: IssInfoState;

  beforeEach(() => {
    state = initialState;
  });

  describe('valid IssInfo actions', () => {
    it('should set currentInfo with mock data', () => {
      const action = IssInfoActions.fetchIssPositionSuccess({ issInfo: ISS_INFO_MOCK});
      const result = issInfoReducer(state, action);

      expect(result.currentInfo).toEqual(ISS_INFO_MOCK);
    });

    it('should invoke selectPosition and set selectedPositionName', () => {
      const action = IssInfoActions.selectPosition({ savedItem: ISS_SAVED_INFO_ITEM});
      const result = issInfoReducer(state, action);

      expect(result.selectedPositionName).toEqual(ISS_SAVED_INFO_ITEM.name);
    });

    it('should invoke unselectPosition and set selectedPositionName', () => {
      const action = IssInfoActions.unselectPosition();
      const result = issInfoReducer(state, action);

      expect(result.selectedPositionName).toEqual(null);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = issInfoReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
