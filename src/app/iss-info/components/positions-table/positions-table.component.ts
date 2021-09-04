import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IssSavedInfo } from '../../models/iss-info';
import { deleteIssPosition, saveIssPosition } from '../../store/iss-info/iss-info.actions';
import { selectSavedIssPositions } from '../../store/iss-info/iss-info.selectors';

@Component({
  selector: 'app-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: ['./positions-table.component.sass']
})
export class PositionsTableComponent implements OnInit {

  constructor(private store$: Store) { }
  displayedColumns: string[] = ['date', 'name', 'latitude', 'longitude', 'delete'];

  savedPositions$: Observable<IssSavedInfo[]> = this.store$.select(selectSavedIssPositions)
  ngOnInit(): void {
  }

  deletePosition(position: IssSavedInfo) {
    this.store$.dispatch(deleteIssPosition({position}))
  }


}
