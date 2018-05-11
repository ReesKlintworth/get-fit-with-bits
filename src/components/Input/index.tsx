import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './style';

interface Props {
  onChangeText: (newText: string) => void;
  defaultValue?: string;
}

export default class Input extends React.PureComponent<Props> {
  render() {
    const { onChangeText, defaultValue } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          defaultValue={defaultValue}
          style={styles.input}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
}
