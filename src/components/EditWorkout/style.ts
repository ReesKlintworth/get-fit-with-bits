import { StyleSheet } from 'react-native';
import Colors from '../../Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    width: '100%',
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
  bottomButtonsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});
