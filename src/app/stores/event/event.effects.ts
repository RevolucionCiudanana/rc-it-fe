// Step 3: Define effects (optional)
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as EventActions from './event.actions';

@Injectable()
export class EventEffects {

    constructor(private actions$: Actions) { }
}
