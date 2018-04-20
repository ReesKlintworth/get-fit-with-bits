import { combineReducers, AnyAction } from 'redux';
import { Dispatch as ReduxDispatch } from 'redux';
import { NavigationState } from 'react-navigation';
import nav from './navReducer';

export interface AppState {
  nav: NavigationState;
}

export interface StringTypeAction extends AnyAction {
  type: string;
}

export type Dispatch = ReduxDispatch<AppState>;

// Add more
export default combineReducers<AppState>({
  nav,
});
