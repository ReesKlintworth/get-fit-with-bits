import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { NavigationProps } from '../navigation/rootNavigation';

export default class NewWorkout extends React.PureComponent<{} & NavigationProps> {
  render() {
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: 'red', alignItems: 'center' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={{ marginTop: 80 }}>New Workout</Text>
        </SafeAreaView>
      </View>
    );
  }
}
