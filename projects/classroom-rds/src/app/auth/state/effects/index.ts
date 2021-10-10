
import { AuthEffects } from './auth.effects';
import { FireEffects } from './fire.effects';
// start:ng42.barrel
export * from './auth.effects';
export * from './fire.effects';
// end:ng42.barrel

export const authEffects: any[] = [
  AuthEffects,
  FireEffects,
]
