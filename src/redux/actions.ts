import { NavigationActions, NavigationAction } from 'react-navigation';
import { AppRoutes } from '../navigation/routes';
import { Dispatch } from './';

export enum ActionKeys {
  WorkoutAdd = 'WorkoutAdd',
  WorkoutSave = 'WorkoutSave',
  WorkoutDelete = 'WorkoutDelete',
}

export interface Action<P> {
  readonly type: ActionKeys;
  readonly payload: P;
}

export interface WorkoutAdd
  extends Action<{
      readonly name: string;
      readonly date: Date;
    }> {
  type: ActionKeys.WorkoutAdd;
}

export interface WorkoutSave
  extends Action<{
      readonly workoutId: string;
      readonly name: string;
    }> {
  type: ActionKeys.WorkoutSave;
}

export interface WorkoutDelete extends Action<string> {
  type: ActionKeys.WorkoutDelete;
}

export type ActionTypes =
  | WorkoutAdd
  | WorkoutDelete
  | WorkoutSave
  | NavigationAction;

export const newWorkout = () =>
  NavigationActions.navigate({
    routeName: AppRoutes.EditWorkout,
  });

export const editWorkout = (workoutId: string) =>
  NavigationActions.navigate({
    routeName: AppRoutes.EditWorkout,
    params: {
      workoutId,
    },
  });

export const saveNewWorkout = (name: string, date: Date) => {
  return (dispatch: Dispatch) => {
    const addWorkoutAction: WorkoutAdd = {
      type: ActionKeys.WorkoutAdd,
      payload: {
        name,
        date,
      },
    };
    dispatch(addWorkoutAction);
    dispatch(NavigationActions.back({}));
  };
};

export const saveExistingWorkout = (workoutId: string, name: string) => {
  return (dispatch: Dispatch) => {
    const saveWorkoutAction: WorkoutSave = {
      type: ActionKeys.WorkoutSave,
      payload: {
        workoutId,
        name,
      },
    };
    dispatch(saveWorkoutAction);
    dispatch(NavigationActions.back({}));
  };
};

export const deleteWorkout = (id: string): WorkoutDelete => {
  return {
    type: ActionKeys.WorkoutDelete,
    payload: id,
  };
};
