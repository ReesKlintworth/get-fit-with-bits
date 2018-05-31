import { ActionTypes } from './actions';
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
    default:
      return state;
  }
};
export default editWorkoutReducer;
