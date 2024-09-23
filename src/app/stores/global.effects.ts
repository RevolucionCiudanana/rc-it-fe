import { AuthEffects } from './auth/authentication.effects';
import { EventEffects } from './event/event.effects';
export const effects = [
  EventEffects,
  AuthEffects,
];
