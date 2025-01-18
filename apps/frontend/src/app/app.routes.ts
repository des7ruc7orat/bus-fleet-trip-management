import { Route } from '@angular/router';
import { LoginComponent } from './components/login/ui/login.component';
import { BusFormComponent } from './components/bus/ui/bus-form/bus-form.component';
import { BusListComponent } from './components/bus/ui/bus-list/bus-list.component';
import { AuthGuard } from './components/guards/auth.guard';
import { FleetFormComponent } from './components/fleet/ui/fleet-form/fleet-form.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent},
  { path: 'bus-form', component: BusFormComponent, canActivate:[AuthGuard] }, // Protect the route with a guard},
  { path: 'bus-list', component: BusListComponent, canActivate:[AuthGuard] }, // Protect the route with a guard},
  { path: 'fleet-form', component: FleetFormComponent, canActivate:[AuthGuard] }, // Protect the route with a guard},
  { path: '**', redirectTo: 'login' },
];
