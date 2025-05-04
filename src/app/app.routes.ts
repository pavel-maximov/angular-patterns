import { Routes } from '@angular/router';
import { SignalComponent } from './signal/signal.component';

export const routes: Routes = [
  { path: 'signal', component: SignalComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
