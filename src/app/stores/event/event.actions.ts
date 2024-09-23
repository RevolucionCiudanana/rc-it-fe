// Step 1: Define actions
import { createAction, props } from '@ngrx/store';

export const saveStep1 = createAction('[Event] Save Step 1', props<{ step1Data: any }>());

export const saveStep2 = createAction('[Event] Save Step 2', props<{ step2Data: any }>());

export const saveStep3 = createAction('[Event] Save Step 3', props<{ step3Data: any }>());

export const cleanSteps = createAction('[Event] Clean Steps');
