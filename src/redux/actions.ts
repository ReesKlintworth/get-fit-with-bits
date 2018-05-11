import { NavigationActions } from 'react-navigation';
import { AppRoutes } from '../navigation/routes';
import { Dispatch } from './';

export enum Keys {
  WorkoutAdd = 'WorkoutAdd',
  WorkoutDelete = 'WorkoutDelete',
}

export interface WorkoutAdd {
  readonly type: Keys.WorkoutAdd;
  readonly payload: {
    readonly name: string;
    readonly date: Date;
  };
}

export interface WorkoutDelete {
  readonly type: Keys.WorkoutDelete;
  readonly payload: string;
}

export type WorkoutActionTypes = WorkoutAdd | WorkoutDelete;

export const newWorkout = () =>
  NavigationActions.navigate({
    routeName: AppRoutes.NewWorkout,
  });

export const saveNewWorkout = (name: string, date: Date) => {
  return (dispatch: Dispatch) => {
    const addWorkoutAction: WorkoutAdd = {
      type: Keys.WorkoutAdd,
      payload: {
        name,
        date,
      },
    };
    dispatch(addWorkoutAction);
    dispatch(NavigationActions.back({}));
  };
};

export const deleteWorkout = (id: string): WorkoutDelete => {
  return {
    type: Keys.WorkoutDelete,
    payload: id,
  };
};
