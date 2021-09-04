import { AfterContentInit, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, EMPTY } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';
import { SatelliteService } from '../../services/satellite.service';
import {
  clickPosition,
  fetchIssPosition,
  fetchIssPositionSuccess,
  selectPosition,
  unselectPosition,
} from './iss-info.actions';
import { selectSelectedPositionName } from './iss-info.selectors';

@Injectable()
export class ISSEffects {
  loadPositions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchIssPosition),
      mergeMap(() =>
        this.satelliteService.fetchSatelliteInfo().pipe(
          map((issInfo) =>
            fetchIssPositionSuccess({
              issInfo: {
                ...issInfo,
                timestamp: issInfo.timestamp * 1000,
              },
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  clickPosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clickPosition),
      withLatestFrom(this.store$.select(selectSelectedPositionName)),
      map(([{ clickedItem }, selectedPositionName]) => {
        if (selectedPositionName && clickedItem.name === selectedPositionName) {
          return unselectPosition();
        }
        return selectPosition({ savedItem: clickedItem });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private satelliteService: SatelliteService,
    private store$: Store
  ) { }
}
