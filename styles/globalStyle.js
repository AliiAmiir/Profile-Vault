import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
    },
    logo: {
      width: 150,
      height: 150,
    },
    formContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    column: {
      paddingHorizontal: 10,
    },
    input: {
      height: 40,
      backgroundColor: '#f2f2f7',
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      width: 150,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
    },
    signupButton: {
      backgroundColor: '#6374D1',
      paddingVertical: 15,
      borderRadius: 5,
    },
    signupButtonText: {
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '700',
    },
  });