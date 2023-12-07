import * as auth from './auth';
import * as notes from './notes';
import * as timer from './timer';
export const api = {
  ...auth,
  ...timer,
  ...notes,
};
