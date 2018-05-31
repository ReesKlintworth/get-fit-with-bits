import { combineReducers } from 'redux';
import { Dispatch as ReduxDispatch } from 'redux';
import nav from './navReducer';
import workouts from './workoutReducer';
import editWorkout from './editWorkoutReducer';
import { AppState } from './stateTypes';

export * from './stateTypes';

export type Dispatch = ReduxDispatch<AppState>;

export default combineReducers<AppState>({
  nav,
  workouts,
  editWorkout,
});
