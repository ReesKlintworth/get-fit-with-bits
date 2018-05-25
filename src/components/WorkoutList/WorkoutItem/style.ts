import { StyleSheet } from 'react-native';
import Colors from '../../../Colors';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
    paddingRight: 16,
  },
  name: {
    fontSize: 16,
    color: Colors.leTextContrast,
    fontWeight: '700',
  },
  type: {
    fontSize: 16,
    color: Colors.leTextDefault,
  },
});
