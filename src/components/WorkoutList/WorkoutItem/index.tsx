import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Workout } from '../../../types';

import styles from './style';

interface OwnProps {
  workout: Workout;
}

type Props = OwnProps;

export default class WorkoutItem extends React.PureComponent<Props> {
  tappedWorkout = () => {
    // TODO
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
