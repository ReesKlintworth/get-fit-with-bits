import { Workout } from '../types';
import { AppState } from '.';

export const getWorkout = (
  state: AppState,
  workoutId: string
): Workout | undefined => {
  return state.workouts[workoutId];
};
