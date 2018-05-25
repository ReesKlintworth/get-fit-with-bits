import React from 'react';
import { FlatList, View, ListRenderItemInfo } from 'react-native';
import { Workout } from '../../types';
import WorkoutItem from './WorkoutItem';

import styles from './style';

interface Props {
  workouts: Workout[];
}

export default class WorkoutList extends React.PureComponent<Props> {
  extractKey = ({ id }: Workout) => {
    return id;
  };

  renderItem = ({ item: workout }: ListRenderItemInfo<Workout>) => {
    return <WorkoutItem workout={workout} />;
  };

  ItemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const { workouts } = this.props;
    return (
      <FlatList
        style={styles.flatlist}
        data={workouts}
        keyExtractor={this.extractKey}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.ItemSeparatorComponent}
      />
    );
  }
}
