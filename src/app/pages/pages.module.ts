import { NgModule } from '@angular/core';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

import { SharedModule } from './../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from "./rxjs/RxjsComponent";
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent

    ],
    exports: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      PagesComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule,
      PipesModule
    ]
})
export class PagesModule {}
