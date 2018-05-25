import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './style';
import Colors from '../../Colors';

interface Props {
  onChangeText: (newText: string) => void;
  value: string;
  placeholder?: string;
  style?: any; // TODO - refine
}

export default class Input extends React.PureComponent<Props> {
  render() {
    const { onChangeText, value, style, placeholder } = this.props;
    const containerStyles = [styles.container];
    if (!!style) {
      containerStyles.push(style);
    }
    return (
      <View style={containerStyles}>
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.leTextNonessential}
          style={styles.input}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
}
