import { Route } from '@angular/router';
import { LoginComponent } from './components/login/ui/login.component';
import { BusFormComponent } from './components/bus/ui/bus-form/bus-form.component';
import { BusListComponent } from './components/bus/ui/bus-list/bus-list.component';
import { AuthGuard } from './components/guards/auth.guard';
import { FleetFormComponent } from './components/fleet/ui/fleet-form/fleet-form.component';
import { FleetListComponent } from './components/fleet/ui/fleet-list/fleet-list.component';
import { TripFormComponent } from './components/trip/ui/trip-form/trip-form.component';
import { TripListComponent } from './components/trip/ui/trip-list/trip-list.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'bus-form', component: BusFormComponent, canActivate: [AuthGuard] }, // Protect the route with a guard},
  {
    path: 'bus-form/:id',
    component: BusFormComponent,
    canActivate: [AuthGuard],
  }, // Route with ID
  { path: 'bus-list', component: BusListComponent, canActivate: [AuthGuard] }, // Protect the route with a guard},
  {
    path: 'fleet-form',
    component: FleetFormComponent,
    canActivate: [AuthGuard],
  }, // Protect the route with a guard},
  {
    path: 'fleet-form/:id',
    component: FleetFormComponent,
    canActivate: [AuthGuard],
  }, // Route with ID
  {
    path: 'fleet-list',
    component: FleetListComponent,
    canActivate: [AuthGuard],
  }, // Protect the route with a guard},
  { path: 'trip-form', component: TripFormComponent, canActivate: [AuthGuard] }, // Protect the route with a guard},
  {
    path: 'trip-form/:id',
    component: TripFormComponent,
    canActivate: [AuthGuard],
  }, // Route with ID
  { path: 'trip-list', component: TripListComponent, canActivate: [AuthGuard] }, // Protect the route with a guard},
  { path: '**', redirectTo: 'login' },
];
