import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { EventsComponent } from './components/events/events.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEventsComponent } from './components/create-events/create-events.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'events', component: EventsComponent },
  { path: 'create-event', component: CreateEventsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
