import { NavigationAction, NavigationActions } from 'react-navigation';
import { Dispatch, AppState } from './';
import { AppRoutes } from '../navigation/routes';
import { getWorkout } from './selectors';

export enum ActionKeys {
  WorkoutAdd = 'WorkoutAdd',
  WorkoutSave = 'WorkoutSave',
  WorkoutDelete = 'WorkoutDelete',
  EditWorkoutBegin = 'EditWorkoutBegin',
  EditWorkoutEnd = 'EditWorkoutEnd',
  EditWorkoutChangeName = 'EditWorkoutChangeName',
  EditWorkoutChangeType = 'EditWorkoutChangeType',
  EditWorkoutChangeImageUri = 'EditWorkoutChangeImageUri',
}

export interface Action<P = null> {
  readonly type: ActionKeys;
  readonly payload: P;
}

export interface WorkoutAdd
  extends Action<{
      readonly name: string;
      readonly type: string;
      readonly date: Date;
      readonly imageUri: string | null;
    }> {
  type: ActionKeys.WorkoutAdd;
}

export interface WorkoutSave
  extends Action<{
      readonly workoutId: string;
      readonly name: string;
      readonly type: string;
      readonly imageUri: string | null;
    }> {
  type: ActionKeys.WorkoutSave;
}

export interface WorkoutDelete extends Action<string> {
  type: ActionKeys.WorkoutDelete;
}

export interface EditWorkoutBegin
  extends Action<{
      name: string;
      type: string | null;
      imageUri: string | null;
    }> {
  type: ActionKeys.EditWorkoutBegin;
}

export interface EditWorkoutEnd extends Action {
  type: ActionKeys.EditWorkoutEnd;
}

export interface EditWorkoutChangeName extends Action<string> {
  type: ActionKeys.EditWorkoutChangeName;
}

export interface EditWorkoutChangeType extends Action<string> {
  type: ActionKeys.EditWorkoutChangeType;
}

export interface EditWorkoutChangeImageUri extends Action<string | null> {
  type: ActionKeys.EditWorkoutChangeImageUri;
}

export type ActionTypes =
  | WorkoutAdd
  | WorkoutDelete
  | WorkoutSave
  | EditWorkoutBegin
  | EditWorkoutEnd
  | EditWorkoutChangeName
  | EditWorkoutChangeType
  | EditWorkoutChangeImageUri
  | NavigationAction;

export const editWorkout = (workoutId: string | null) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    let payload: {
      name: string;
      type: string | null;
      imageUri: string | null;
    } = {
      name: `${new Date().toLocaleDateString()} Workout`,
      type: null,
      imageUri: null,
    };
    if (!!workoutId) {
      const state = getState();
      const workout = getWorkout(state, workoutId);
      if (!!workout) {
        payload = {
          name: workout.name,
          type: workout.type,
          imageUri: workout.imageUri,
        };
      }
    }
    const beginEditWorkoutAction: EditWorkoutBegin = {
      type: ActionKeys.EditWorkoutBegin,
      payload,
    };
    dispatch(beginEditWorkoutAction);

    dispatch(
      NavigationActions.navigate({
        routeName: AppRoutes.EditWorkout,
        params: {
          workoutId,
        },
      })
    );
  };
};

export const changeName = (name: string): EditWorkoutChangeName => ({
  type: ActionKeys.EditWorkoutChangeName,
  payload: name,
});

export const changeType = (type: string): EditWorkoutChangeType => ({
  type: ActionKeys.EditWorkoutChangeType,
  payload: type,
});

export const saveWorkout = (params: { date?: Date; workoutId?: string }) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const { name, type, imageUri } = state.editWorkout;
    if (!name || !type) {
      return;
    }

    if (params.workoutId) {
      const saveWorkoutAction: WorkoutSave = {
        type: ActionKeys.WorkoutSave,
        payload: {
          workoutId: params.workoutId,
          name,
          type,
          imageUri,
        },
      };
      dispatch(saveWorkoutAction);
    } else if (params.date) {
      if (!!name && !!type) {
        const addWorkoutAction: WorkoutAdd = {
          type: ActionKeys.WorkoutAdd,
          payload: {
            name,
            date: params.date,
            imageUri,
            type,
          },
        };
        dispatch(addWorkoutAction);
      }
    }

    const endEditWorkoutAction: EditWorkoutEnd = {
      type: ActionKeys.EditWorkoutEnd,
      payload: null,
    };
    dispatch(endEditWorkoutAction);
    dispatch(NavigationActions.back({}));
  };
};

export const deleteWorkout = (id: string) => {
  return (dispatch: Dispatch) => {
    const deleteWorkoutAction: WorkoutDelete = {
      type: ActionKeys.WorkoutDelete,
      payload: id,
    };
    dispatch(deleteWorkoutAction);
    dispatch(NavigationActions.back({}));
  };
};

export const changeImage = (uri: string) => {
  return (dispatch: Dispatch) => {
    const newWorkoutChangeImageUriAction: EditWorkoutChangeImageUri = {
      type: ActionKeys.EditWorkoutChangeImageUri,
      payload: uri,
    };
    dispatch(newWorkoutChangeImageUriAction);
    dispatch(NavigationActions.back({}));
  };
};
