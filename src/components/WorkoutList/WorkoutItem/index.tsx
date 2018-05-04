import React from 'react';
import { View, Text } from 'react-native';
import { Workout } from '../../../types';

import styles from './style';

interface Props {
  workout: Workout;
}

export default class WorkoutItem extends React.PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.workout.name}</Text>
      </View>
    );
  }
}
