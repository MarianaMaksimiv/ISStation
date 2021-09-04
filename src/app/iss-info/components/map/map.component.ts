import {AfterViewInit, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ofType} from '@ngrx/effects';
import {ActionsSubject, select, Store} from '@ngrx/store';
import * as L from 'leaflet';
import {Marker} from 'leaflet';
import {filter, take} from 'rxjs/operators';
import {IssInfo, IssSavedInfo} from '../../models/iss-info';
import {selectPosition, unselectPosition} from '../../store/iss-info/iss-info.actions';
import {selectCurrentInfo, selectState} from '../../store/iss-info/iss-info.selectors';
import {AddPositionComponent} from '../add-position/add-position.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements AfterViewInit {
  marker?: Marker;
  markerPosition: IssInfo | null = null;
  markerZoom?: Marker;
  private map: any;

  constructor(
    private dialog: MatDialog,
    private store$: Store,
    private actions$: ActionsSubject
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.handleZoom();
    this.handleUnZoom();
    this.zoomAfterHydration();
  }

  initMap(): void {
    this.map = L.map('map').setView([0, 0], 1);

    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9zdGlzbGF2cmFrYWV2IiwiYSI6ImNrc3U2czB0YzFkamwycW4xdDc0dGV6ZzAifQ.sktXwdeHCrs6JqsKL8qT0w', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      minZoom: 0,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoicm9zdGlzbGF2cmFrYWV2IiwiYSI6ImNrc3U2czB0YzFkamwycW4xdDc0dGV6ZzAifQ.sktXwdeHCrs6JqsKL8qT0w'
    }).addTo(this.map)

    let satelliteIcon = L.icon({
      iconUrl: 'https://img.icons8.com/material/24/000000/satellite-sending-signal.png',
      shadowUrl: '',
      iconSize: [40, 40],
    })

    this.store$.select(selectCurrentInfo).subscribe(
      issInfo => {
        if (this.marker)
          this.map.removeLayer(this.marker)
        if (issInfo.iss_position.latitude !== 0) {
          this.markerPosition = issInfo
          this.marker = L.marker([issInfo.iss_position.latitude, issInfo.iss_position.longitude], {
            icon: satelliteIcon
          }).addTo(this.map);
        }
      }
    )
  }

  openDialog() {
    this.dialog.open(AddPositionComponent, {
      data: this.markerPosition
    });
  }

  zoomAfterHydration(): void {
    this.store$.pipe(
      select(selectState),
      filter((state) => !!(state?.selectedPositionName && state?.savedIssPositions)),
      take(1)
    ).subscribe(({savedIssPositions, selectedPositionName}) => {
      const item = savedIssPositions.find(({name}) => name === selectedPositionName);
      if (item) {
        this.zoom(item);
      }
    })
  }

  handleZoom(): void {
    this.actions$.pipe(
      ofType(selectPosition)
    ).subscribe(
      action => {
        this.zoom(action.savedItem)
      }
    )
  }

  handleUnZoom(): void {
    this.actions$.pipe(
      ofType(unselectPosition)
    ).subscribe(() => {
        if (this.markerZoom) {
          this.map.removeLayer(this.markerZoom)
        }
        this.map.setView([0, 0], 1)
      }
    )
  }

  private zoom(item: IssSavedInfo): void {
    let satelliteIcon = L.icon({
      iconUrl: 'https://img.icons8.com/material/24/000000/satellite-sending-signal.png',
      shadowUrl: '',
      iconSize: [40, 40],
    })

    if (this.markerZoom) {
      this.map.removeLayer(this.markerZoom)
    }

    this.markerZoom = L.marker([item.iss_position.latitude, item.iss_position.longitude], {
      icon: satelliteIcon
    }).addTo(this.map);

    this.map.setView([item.iss_position.latitude, item.iss_position.longitude], 4)
  }
}
