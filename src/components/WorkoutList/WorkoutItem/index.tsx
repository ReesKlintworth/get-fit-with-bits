import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Workout } from '../../../types';

import styles from './style';

interface OwnProps {
  workout: Workout;
  editWorkout: (workoutId: string) => void;
}

type Props = OwnProps;

export default class WorkoutItem extends React.PureComponent<Props> {
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
