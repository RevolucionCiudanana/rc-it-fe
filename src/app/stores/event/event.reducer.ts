// Step 2: Define reducers
import { createReducer, on } from '@ngrx/store';
import { saveStep1, saveStep2, saveStep3, cleanSteps } from './event.actions';

export interface EventState {
    step1: any,
    step2: any,
    step3: any,
}

export const initialState: EventState = {
    step1: null,
    step2: null,
    step3: null,
};

export const eventReducer = createReducer(
    initialState,
    on(saveStep1, (state, { step1Data }) => ({
        ...state,
        step1: step1Data
    })),
    on(saveStep2, (state, { step2Data }) => ({
        ...state,
        step2: step2Data
    })),
    on(saveStep3, (state, { step3Data }) => ({
        ...state,
        step3: step3Data
    })),
    on(cleanSteps, (state) => ({
        ...state,
        step1: null, // Reset step1 data
        step2: null, // Reset step2 data
        step3: null, // Reset step3 data
    }))
);
