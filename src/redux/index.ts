import { combineReducers, AnyAction } from 'redux';
import { Dispatch as ReduxDispatch } from 'redux';
import { NavigationState } from 'react-navigation';
import nav from './navReducer';
import workouts, { Workouts } from './workoutReducer';

export interface AppState {
  nav: NavigationState;
  workouts: Workouts;
}

export interface StringTypeAction extends AnyAction {
  type: string;
}

export type Dispatch = ReduxDispatch<AppState>;

export default combineReducers<AppState>({
  nav,
  workouts,
});
