import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssInfo } from '../../models/iss-info';
import { saveIssPosition } from '../../store/iss-info/iss-info.actions';
import { selectSavedIssPositions } from '../../store/iss-info/iss-info.selectors';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.sass']
})
export class AddPositionComponent implements OnInit {
  form: FormGroup;
  validName: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IssInfo,
    private store$: Store,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [`${this.data.iss_position.latitude};${this.data.iss_position.longitude}`,[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.validateName();
  }

  savePosition() {
      this.validName = true;
      let newPosition = {
        ...this.data,
        name: this.form.get('name')?.value
      }
      this.store$.dispatch(saveIssPosition({issSavedInfo: newPosition}))
  }

  validateName() {
    combineLatest([
      this.store$.select(selectSavedIssPositions),
      this.form.get('name')!.valueChanges
    ]).pipe(
      map(([savedPositions,newPositionName]) => savedPositions.find( position => position.name === newPositionName))
    ).subscribe(
      unUniqueName => {
        this.validName = !unUniqueName;
      }
    )
  }
}
