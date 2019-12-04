import { RouterModule, Routes } from '@angular/router';
// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from "./rxjs/RxjsComponent";
// import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




const pagesRoutes: Routes = [
  // { Lo quitamos para el LazyLoad
  //   path: '',
  //   component: PagesComponent,
  //   canActivate: [ LoginGuardGuard ],
  //   children: [
      // data es un componente opcionar de las rutas,
      // es un objeto y se puede usar para varias cosas
      // Ahora lo usaremos para definir un título para cada página.
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // En este no hace falta porque se redirige al siguiente
      { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard'} 
      },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progreso'}  },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}  },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}  },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables'}  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Opciones Cuenta'}  },
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}  },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'}  },
      // Mantenimientos
      { 
        canActivate: [ AdminGuard ],
        path: 'usuarios', 
        component: UsuariosComponent, 
        data: { titulo: 'Mantenimiento de Usuarios'}  },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos'}  },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico'}  }
    ];
//   }
// ];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );//, { useHash: true });
