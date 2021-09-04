import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IssInfo } from '../../models/iss-info';
import { selectCurrentInfo } from '../../store/iss-info/iss-info.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<void>()
  currentInfo$: Observable<IssInfo> = this.store$.select(selectCurrentInfo)

  constructor(private store$: Store) { }
}
