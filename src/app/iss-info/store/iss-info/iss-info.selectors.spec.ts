import * as fromSelectors from './iss-info.selectors'
import { IssInfo, IssSavedInfo} from '../../models/iss-info'
import { INITIAL_STATE_MOCK, ISS_INFO_MOCK, ISS_SAVED_INFO } from '../../mock/iss-info.mock-data';

describe('Selectors', () => {

    it('should select currentInfo', () => {
        let result = fromSelectors.selectCurrentInfo.projector(INITIAL_STATE_MOCK)

        expect(result).toEqual(ISS_INFO_MOCK)
    });

    it('should select savedIssPositions', () => {
        let result = fromSelectors.selectSavedIssPositions.projector(INITIAL_STATE_MOCK)

        expect(result.length).toEqual(3)
        expect(result).toEqual(ISS_SAVED_INFO)
    })
});