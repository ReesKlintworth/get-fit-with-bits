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
  prompt: {
    fontWeight: 'bold',
    color: Colors.leTextSubtle,
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    marginBottom: 24,
  },
  messageContainer: {
    backgroundColor: Colors.utilityCritical,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
    alignItems: 'center',
    borderRadius: 4,
  },
  message: {
    color: Colors.leBtnStandardPrimaryLabel,
    fontWeight: '700',
    fontSize: 12,
  },
  button: {
    marginBottom: 8,
  },
});
