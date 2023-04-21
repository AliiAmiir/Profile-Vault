import { StyleSheet } from 'react-native';

export const containerStyles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  spaceAround: {
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  selectionPickerContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  textInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    paddingEnd: 15 
  },
  rowAlignContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  updateRowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  }
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
    borderBottomColor: '#F2F2F7',
  },
  inputValue: {
    fontWeight: 500,
    paddingBottom: 5
  }
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
    fontWeight: 500,
  },
  rowUpdateButton: {
    flex: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  rowDeleteButton: {
    flex: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
});

export const textStyles = StyleSheet.create({
  textHeading: {
    fontWeight: 500,
    fontSize: 30,
  },
  textSubHeading: {
    fontWeight: 500,
    fontSize: 20,
    paddingBottom: 10,
  },
  textMiniHeading: {
    fontWeight: 500,
    fontSize: 18,
    paddingBottom: 10,
  },
  errorText: {
    color: 'darkred',
  },
  boldText: {
    fontWeight: 500,
    fontSize: 15,
    paddingBottom: 10,
  },
  subText: {
    fontWeight: 300,
    fontSize: 13,
    paddingBottom: 10,
  }
});

export const pickerStyles = StyleSheet.create({
  pickerButton: {
    backgroundColor: '#F2F2F7',
  }
});
