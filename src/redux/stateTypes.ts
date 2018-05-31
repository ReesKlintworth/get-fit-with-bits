import { NavigationState } from 'react-navigation';
import { Workout } from '../types';

export interface Workouts {
  [workoutId: string]: Workout;
}

export interface EditWorkout {
  name: string | null;
  type: string | null;
  imageUri: string | null;
}

export interface AppState {
  nav: NavigationState;
  workouts: Workouts;
  editWorkout: EditWorkout;
}
