import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IssInfo } from '../models/iss-info';


@Injectable()
export class SatelliteService {

  constructor(private http: HttpClient) { }

  fetchSatelliteInfo() {
    return interval(2000).pipe(
        mergeMap(() => this.http.get<IssInfo>('http://api.open-notify.org/iss-now.json'))
    )
  }
}
