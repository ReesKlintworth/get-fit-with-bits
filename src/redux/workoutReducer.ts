import { ActionTypes, ActionKeys } from './actions';
import { Workouts } from './stateTypes';
import { Workout } from '../types';

const initialState = {};

export default function workoutsReducer(
  state: Workouts = initialState,
  action: ActionTypes
): Workouts {
  switch (action.type) {
    case ActionKeys.WorkoutAdd:
      const newWorkout = new Workout(
        uuidv4(),
        action.payload.name,
        action.payload.type,
        action.payload.date,
        action.payload.imageUri
      );
      return {
        ...state,
        [newWorkout.id]: newWorkout,
      };
    case ActionKeys.WorkoutSave:
      const existingWorkout = state[action.payload.workoutId];
      if (existingWorkout) {
        const editedWorkout = new Workout(
          existingWorkout.id,
          action.payload.name,
          action.payload.type,
          existingWorkout.date,
          action.payload.imageUri
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
