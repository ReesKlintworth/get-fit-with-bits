import { Keys, WorkoutActionTypes } from './actions';
import { Workout } from '../types';

export interface Workouts {
  [workoutId: string]: Workout;
}

const initialState = {};

export default function workoutsReducer(
  state: Workouts = initialState,
  action: WorkoutActionTypes
): Workouts {
  switch (action.type) {
    case Keys.WorkoutAdd:
      const newWorkout = new Workout(
        uuidv4(),
        action.payload.name,
        action.payload.date
      );
      return {
        ...state,
        [newWorkout.id]: newWorkout,
      };
    case Keys.WorkoutDelete:
      const workoutsObjAfterDelete = { ...state };
      delete workoutsObjAfterDelete[action.payload];
      return workoutsObjAfterDelete;
    case Keys.WorkoutSave:
      const existingWorkout = state[action.payload.workoutId];
      if (existingWorkout) {
        const editedWorkout = new Workout(
          existingWorkout.id,
          action.payload.name,
          existingWorkout.date
        );
        return {
          ...state,
          [editedWorkout.id]: editedWorkout,
        };
      }
      return state;
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
