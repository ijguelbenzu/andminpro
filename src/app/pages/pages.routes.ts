import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from "./rxjs/RxjsComponent";



const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // data es un componente opcionar de las rutas,
      // es un objeto y se puede usar para varias cosas
      // Ahora lo usaremos para definir un título para cada página.
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // En este no hace falta porque se redirige al siguiente
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progreso'}  },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}  },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}  },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables'}  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Opciones Cuenta'}  }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forRoot( pagesRoutes, { useHash: true });
