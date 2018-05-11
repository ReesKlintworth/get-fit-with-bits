import { StyleSheet } from 'react-native';
import Colors from '../../Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.leBtnStandardPrimaryBg,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  disabled: {
    backgroundColor: Colors.leBtnStandardDisabledBg,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.leBtnStandardPrimaryLabel,
  },
});
