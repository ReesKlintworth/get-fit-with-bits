import { Keys, WorkoutActionTypes } from './actions';
import { Workout } from '../types';

export interface Workouts {
  workouts: Workout[];
}

const initialState = {
  workouts: [],
};

export default function workoutsReducer(
  state: Workouts = initialState,
  action: WorkoutActionTypes
): Workouts {
  switch (action.type) {
    case Keys.WorkoutAdd:
      return {
        ...state,
        workouts: state.workouts.concat(
          new Workout(uuidv4(), action.name, action.date)
        ),
      };
    case Keys.WorkoutDelete:
      return {
        ...state,
        workouts: state.workouts.filter(workout => {
          return workout.id !== action.id;
        }),
      };
    default:
      return state;
  }
}

const uuidv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
