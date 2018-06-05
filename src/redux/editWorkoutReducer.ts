import { ActionKeys, ActionTypes } from './actions';
import { EditWorkout } from './stateTypes';

const initialState = {
  name: null,
  type: null,
  imageUri: null,
};

const editWorkoutReducer = (
  state: EditWorkout = initialState,
  action: ActionTypes
): EditWorkout => {
  switch (action.type) {
    case ActionKeys.EditWorkoutBegin:
      const { name, type, imageUri } = action.payload;
      return {
        name,
        type,
        imageUri,
      };
    case ActionKeys.EditWorkoutEnd:
      return initialState;
    case ActionKeys.EditWorkoutChangeName:
      return { ...state, name: action.payload };
    case ActionKeys.EditWorkoutChangeType:
      return { ...state, type: action.payload };
    case ActionKeys.EditWorkoutChangeImageUri:
      return { ...state, imageUri: action.payload };
    default:
      return state;
  }
};
export default editWorkoutReducer;
