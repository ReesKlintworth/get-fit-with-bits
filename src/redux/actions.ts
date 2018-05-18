import { NavigationActions } from 'react-navigation';
import { AppRoutes } from '../navigation/routes';
import { Dispatch } from './';

export enum Keys {
  WorkoutAdd = 'WorkoutAdd',
  WorkoutSave = 'WorkoutSave',
  WorkoutDelete = 'WorkoutDelete',
}

export interface WorkoutAdd {
  readonly type: Keys.WorkoutAdd;
  readonly payload: {
    readonly name: string;
    readonly date: Date;
  };
}

export interface WorkoutSave {
  readonly type: Keys.WorkoutSave;
  readonly payload: {
    readonly workoutId: string;
    readonly name: string;
  };
}

export interface WorkoutDelete {
  readonly type: Keys.WorkoutDelete;
  readonly payload: string;
}

export type WorkoutActionTypes = WorkoutAdd | WorkoutDelete | WorkoutSave;

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

export const saveExistingWorkout = (workoutId: string, name: string) => {
  return (dispatch: Dispatch) => {
    const saveWorkoutAction: WorkoutSave = {
      type: Keys.WorkoutSave,
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
    type: Keys.WorkoutDelete,
    payload: id,
  };
};
