import { NavigationAction } from 'react-navigation';

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
