import { StyleSheet } from 'react-native';
import Colors from '../../Colors';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.leBgLevel3,
    backgroundColor: Colors.leBgLevel0,
    height: 54,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  input: { flex: 1, width: '100%', color: Colors.leTextContrast },
});
