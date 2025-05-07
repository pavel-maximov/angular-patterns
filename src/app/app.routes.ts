import { Routes } from '@angular/router';
import { ComponentComponent } from './component/component.component';
import { SignalComponent } from './signal/signal.component';

export const routes: Routes = [
  { path: 'signal', component: SignalComponent },
  { path: 'component', component: ComponentComponent },
  { path: '', redirectTo: '/component', pathMatch: 'full' },
];
