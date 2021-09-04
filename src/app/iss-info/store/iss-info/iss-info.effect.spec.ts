import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { INITIAL_STATE_MOCK, ISS_INFO_MOCK } from '../../mock/iss-info.mock-data';
import { SatelliteService } from '../../services/satellite.service';
import { ISSEffects } from './iss-info.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { fetchIssPosition, fetchIssPositionSuccess} from './iss-info.actions';

describe('IssInfoEffects', () => {
    const initialState = INITIAL_STATE_MOCK
    const satelliteService = jasmine.createSpyObj('satelliteService', [
        'fetchSatelliteInfo'
    ])

    let effects: ISSEffects;
    let actions: Observable<any>;
    let store: MockStore<any>;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ISSEffects,
                provideMockStore({initialState}),
                provideMockActions(() => actions),
                {provide: SatelliteService, useValue: satelliteService}
            ]
        });

        effects = TestBed.inject(ISSEffects)
        store = TestBed.inject(MockStore)
        store.setState(INITIAL_STATE_MOCK);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })
    })

    it('should be created', () => {
        expect(effects).toBeTruthy();
    })

    describe('loadPositions$', () => {
        it('should return fetchIssPositionSuccess action', () => {
            const issInfo = ISS_INFO_MOCK
            const action = fetchIssPosition();
            const outcome = fetchIssPositionSuccess({issInfo})
            console.log(store)
            testScheduler.run(({hot, cold, expectObservable}) => {
                actions = hot('-a', { a: action})
                const response = cold('-b|', { b: issInfo})
                satelliteService.fetchSatelliteInfo.and.returnValue(response)

                expectObservable(effects.loadPositions$).toBe('--b', {b: outcome})
            })
        })
    })
})
