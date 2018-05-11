import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './style';

interface Props {
  onPress: () => void;
  title: string;
  disabled: boolean;
}

export default class Button extends React.PureComponent<Props> {
  render() {
    const { onPress, title, disabled } = this.props;
    const containerStyle = [styles.container];
    if (disabled) {
      containerStyle.push(styles.disabled);
    }
    return (
      <TouchableOpacity
        disabled={disabled}
        style={containerStyle}
        onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
