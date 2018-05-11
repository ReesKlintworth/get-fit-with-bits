import { StyleSheet } from 'react-native';
import Colors from '../../Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  safeArea: { flex: 1, width: '100%' },
  prompt: {
    fontWeight: 'bold',
    color: Colors.leTextContrast,
  },
});
