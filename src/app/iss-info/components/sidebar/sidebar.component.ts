import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { IssSavedInfo } from '../../models/iss-info';
import { clickPosition, saveFilterValue } from '../../store/iss-info/iss-info.actions';
import { selectFilteredValue, selectSavedIssPositions } from '../../store/iss-info/iss-info.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  filter: FormControl = new FormControl('');
  savedPositions$: Observable<IssSavedInfo[]> = combineLatest([
    this.store$.select(selectSavedIssPositions),
    this.store$.select(selectFilteredValue)
  ])
  .pipe(
    map(([savedPositions, filterValue]) =>{
      if(!savedPositions){
        return [];
      }
      if(!filterValue){
        return savedPositions;
      }
      return savedPositions.filter( position => position.name.toLowerCase().includes(filterValue.toLowerCase()))
    })
  )

  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.handleFilter();
  }

  selectLocation(position: IssSavedInfo): void {
    this.store$.dispatch(clickPosition({ clickedItem: position }));
  }

  handleFilter() {
    this.filter.valueChanges
    .pipe(debounceTime(500))
    .subscribe(
      value => this.store$.dispatch(saveFilterValue({filterValue: value}))
    )
  }
}
