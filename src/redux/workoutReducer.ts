import { ActionTypes } from './actions';
import { Workouts } from './stateTypes';

const initialState = {};

export default function workoutsReducer(
  state: Workouts = initialState,
  action: ActionTypes
): Workouts {
  switch (action.type) {
    default:
      return state;
  }
}

// @ts-ignore
const uuidv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
