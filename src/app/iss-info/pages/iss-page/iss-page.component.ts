import { BreakpointObserver } from '@angular/cdk/layout';
import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { clickPosition, closeSidebar, fetchIssPosition, fetchIssPositionSuccess, restoreDeletedPosition, toggleSidebar } from '../../store/iss-info/iss-info.actions';
import { selectSidebarOpened } from '../../store/iss-info/iss-info.selectors';

@Component({
  selector: 'app-iss-page',
  templateUrl: './iss-page.component.html',
  styleUrls: ['./iss-page.component.sass']
})
export class IssPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  @HostListener('window:keydown',['$event'])
  onKeyDown($event: KeyboardEvent) {
    if(($event.ctrlKey || $event.metaKey) && $event.key == 'z'){
      this.store$.dispatch(restoreDeletedPosition())
    }
  }

  opened$: Observable<boolean> = this.store$.select(selectSidebarOpened);

  constructor(
    private store$: Store,
    private observer: BreakpointObserver,
    private actons$: ActionsSubject
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(fetchIssPosition())
  }

  ngAfterViewInit() {
      this.observeBreakePoint();
      this.handlePositionSelected();
  }

  toggleSidebar() {
    this.store$.dispatch(toggleSidebar());
  }

  observeBreakePoint() {
    this.observer.observe(['(max-width: 800px)']).subscribe(
        (res) => {
          this.sidenav.mode = res.matches ? 'over' : 'side'
        }
      )
  }
  handlePositionSelected(){
    this.actons$.pipe(
      ofType(clickPosition),
      filter(() => this.sidenav.opened && this.sidenav.mode === 'over')
    ).subscribe(
      () => this.store$.dispatch(closeSidebar())
    )
  }
}
