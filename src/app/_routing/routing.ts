import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from '../log-in/log-in.component';
import { KontaktComponent } from '../kontakt/kontakt.component';
import { AuthGuard } from '../_guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'kontakter',  component:  KontaktComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(appRoutes);
