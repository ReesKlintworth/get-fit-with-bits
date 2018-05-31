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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 24,
    alignSelf: 'center',
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
