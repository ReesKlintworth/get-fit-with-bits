import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './style';

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: any; // TODO - refine
}

export default class Button extends React.PureComponent<Props> {
  render() {
    const { onPress, title, disabled, style } = this.props;
    const containerStyles = [styles.container];
    if (!!disabled) {
      containerStyles.push(styles.disabled);
    }
    if (!!style) {
      containerStyles.push(style);
    }
    return (
      <TouchableOpacity
        disabled={disabled}
        style={containerStyles}
        onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
