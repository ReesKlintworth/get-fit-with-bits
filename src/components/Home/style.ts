import { StyleSheet } from 'react-native';
import Colors from '../../Colors';

export default StyleSheet.create({
  container: { flex: 1, width: '100%', backgroundColor: Colors.leBgLevel0 },
  button: { marginHorizontal: 16 },
  largeText: {
    color: Colors.leTextNonessential,
    fontSize: 40,
    fontWeight: 'bold',
  },
  smallText: {
    color: Colors.leTextNonessential,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
});
