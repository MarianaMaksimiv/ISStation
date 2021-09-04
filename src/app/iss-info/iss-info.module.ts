import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssInfoRoutingModule } from './iss-info-routing.module';
import { MaterialModule } from './material.module';
import { IssPageComponent } from './pages/iss-page/iss-page.component';
import { MapComponent } from './components/map/map.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { issInfoReducer, ISS_INFO_REDUCER_NODE } from './store/iss-info/iss-info.reducer';
import { SatelliteService } from './services/satellite.service';
import { HttpClientModule } from '@angular/common/http';
import { ISSEffects } from './store/iss-info/iss-info.effects';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PositionItemComponent } from './components/position-item/position-item.component';
import { PositionsTableComponent } from './components/positions-table/positions-table.component';
import { HydrationEffects } from './store/hydarate/hydration.effects';


@NgModule({
  declarations: [
    IssPageComponent,
    MapComponent,
    AddPositionComponent,
    HeaderComponent,
    SidebarComponent,
    PositionItemComponent,
    PositionsTableComponent
  ],
  imports: [
    CommonModule,
    IssInfoRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(ISS_INFO_REDUCER_NODE,issInfoReducer),
    EffectsModule.forFeature([ISSEffects,HydrationEffects])
  ],
  providers: [SatelliteService]
})
export class IssInfoModule { }
