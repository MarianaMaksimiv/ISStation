import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IssSavedInfo} from '../../models/iss-info';
import {deleteIssPosition} from '../../store/iss-info/iss-info.actions';
import {selectSelectedPositionName} from '../../store/iss-info/iss-info.selectors';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.sass']
})
export class PositionItemComponent implements OnInit {
  isSelected: boolean = false;
  @Input() position: IssSavedInfo | null = null;

  constructor(private store$: Store) { }

  ngOnInit(): void {
    console.log(this.position);
    this.handleSelectedPosition();
  }

  deletePosition() {
    this.store$.dispatch(deleteIssPosition({position: this.position!}))
  }

  handleSelectedPosition() {
    this.store$.select(selectSelectedPositionName).subscribe(
      selectedName => {
        this.isSelected = (selectedName === this.position?.name)
      }
    )
  }
}
