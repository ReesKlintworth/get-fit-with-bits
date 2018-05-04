import React from 'react';
import { FlatList, View, ListRenderItemInfo } from 'react-native';
import { Workout } from '../../types';
import WorkoutItem from './WorkoutItem';

interface Props {
  workouts: Workout[];
}

export default class WorkoutList extends React.PureComponent<Props> {
  extractKey = ({ id }: Workout) => id;

  renderItem = ({ item: workout }: ListRenderItemInfo<Workout>) => {
    return <WorkoutItem workout={workout} />;
  };

  ItemSeparatorComponent = () => {
    return <View style={{ height: 1, backgroundColor: 'black' }} />;
  };

  render() {
    const { workouts } = this.props;
    return (
      <FlatList
        style={{ flex: 1 }}
        data={workouts}
        keyExtractor={this.extractKey}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.ItemSeparatorComponent}
      />
    );
  }
}
