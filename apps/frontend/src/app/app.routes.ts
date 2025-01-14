import { Route } from '@angular/router';
import { LoginComponent } from './components/login/ui/login.component';
import { BusFormComponent } from './components/bus/ui/form/bus-form.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'bus-form', component: BusFormComponent },
];
