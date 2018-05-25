import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Workout } from '../../../types';
import { editWorkout } from '../../../redux/actions';

import styles from './style';
import { connect } from 'react-redux';
import { Dispatch } from '../../../redux';
import { bindActionCreators } from 'redux';

interface OwnProps {
  workout: Workout;
}

interface DispatchProps {
  readonly editWorkout: (workoutId: string) => void;
}

type Props = OwnProps & DispatchProps;

class WorkoutItem extends React.PureComponent<Props> {
  tappedWorkout = () => {
    this.props.editWorkout(this.props.workout.id);
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.tappedWorkout}>
        <Text style={styles.name}>{this.props.workout.name}</Text>
        <Text style={styles.type}>{this.props.workout.type}</Text>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    editWorkout: bindActionCreators(editWorkout, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(WorkoutItem);
