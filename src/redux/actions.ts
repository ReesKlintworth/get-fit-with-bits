import { NavigationActions } from 'react-navigation';
import { AppRoutes } from '../navigation/routes';
import { StringTypeAction } from '.';

export enum Keys {
  WorkoutAdd = 'WorkoutAdd',
  WorkoutDelete = 'WorkoutDelete',
}

export type WorkoutActionTypes = WorkoutAdd | WorkoutDelete;

export interface WorkoutAdd extends StringTypeAction {
  readonly type: Keys.WorkoutAdd;
  readonly name: string;
  readonly date: Date;
}

export interface WorkoutDelete extends StringTypeAction {
  readonly type: Keys.WorkoutDelete;
  readonly id: string;
}

export const newWorkout = () =>
  NavigationActions.navigate({
    routeName: AppRoutes.NewWorkout,
  });

export const addWorkout = (name: string, date: Date): WorkoutAdd => {
  return {
    type: Keys.WorkoutAdd,
    name,
    date,
  };
};

export const deleteWorkout = (id: string): WorkoutDelete => {
  return {
    type: Keys.WorkoutDelete,
    id,
  };
};
