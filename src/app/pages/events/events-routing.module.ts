import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'create-event', loadChildren: () => import('./create-event/create-event.module').then(m => m.CreateEventModule),
      canActivate: [AuthGuard],

    },
    {
      path: 'events', loadChildren: () => import('./list-events/list-events.module').then(m => m.ListEventsModule),
    },
    {
      path: 'event/:uuid', loadChildren: () => import('./detail-event/detail-event.module').then(m => m.DetailEventModule),
    },
  ])], exports: [RouterModule]
})
export class EventsRoutingModule { }
