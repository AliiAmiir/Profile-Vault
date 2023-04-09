import { StyleSheet } from 'react-native';

export const containerStyles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInputContainer: {
    paddingHorizontal: 15
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
  label: {
    fontWeight: 500,
    paddingBottom: 5
  },
  input: {
    minHeight: 40,
    minWidth: 150,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
});

export const formButtonStyles = StyleSheet.create({
  formButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  formButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

