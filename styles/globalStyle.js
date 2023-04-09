import { StyleSheet } from 'react-native';

export const containerStyles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
});

export const logoStyles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export const formInputTextStyles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#f2f2f7',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 150,
  },
});

export const formButtonStyles = StyleSheet.create({
  formButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 15,
    borderRadius: 5,
  },
  formButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
});