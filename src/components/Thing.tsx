import React from 'react';
import { View, SafeAreaView } from 'react-native';

interface Props {
  stuff?: string;
}
export default class Thing extends React.PureComponent<Props> {
  render() {
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: 'red' }}>
        <SafeAreaView style={{ flex: 1 }} />
      </View>
    );
  }
}
