import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { auth } from '../config/FirebaseConfig';
import { collection, query, where, doc, getDocs, limit } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { Avatar } from 'react-native-elements';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Componenets
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';

// const dummyData = {
//   Hobbies: ['Reading', 'Gardening', 'Cooking'],
//   Goals: ['Learn a new language', 'Travel to Europe'],
//   Preferences: ['Vegan', 'Morning person'],
//   FavorCategories: ['Help with moving', 'Pet sitting'],
//   UpcomingTrips: ['New York City', 'San Francisco'],
// };

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false,
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      dateOfBirth: '',
      phone: ''
    }
  }

  componentDidMount() {
    this.fetchUserData();
  }

  componentWillUnmount() {
    if (this.fetchUserData) {
      this.fetchUserData();
    }
  }

  async fetchUserData() {
    const q = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs[0].data();

    this.setState({
      loading: false,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      dateOfBirth: userData.dateOfBirth,
      phone: userData.phone
    });
  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <ScrollView>
          <View style={containerStyles.textContainer}>
            <View style={containerStyles.rowContainer}>
              <View style={containerStyles.avatarContainer}>
                <Avatar size={120} rounded title='SR' overlayContainerStyle={{ backgroundColor: '#F2F2F7' }} />
              </View>

              <View style={containerStyles.rowAlignContainer}>
                <Text style={textStyles.textHeading}>{this.state.firstName}, 27</Text>
              </View>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Hobbies</Text>
              <Text>Hobby 1</Text>
              <Text>Hobby 2</Text>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Goals</Text>
              <Text>Goal 1</Text>
              <Text>Goal 2</Text>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Preferences</Text>
              <Text>Preferences 1</Text>
              <Text>Preferences 2</Text>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Favor Categories</Text>
              <Text>Favor 1</Text>
              <Text>Favor 2</Text>
            </View>
          </View>
          <View style={containerStyles.buttonContainer}>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// const Home = () => {
//   const handleProfilePicturePress = () => {
//     // Implement the function to open the camera
//     console.log('Profile picture pressed');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TouchableOpacity onPress={handleProfilePicturePress} style={styles.profilePictureContainer}>
//         <Image
//           source={require('./../assets/icon.png')} // Replace with the path to your placeholder image
//           style={styles.profilePicture}
//         />
//       </TouchableOpacity>
//       <Text style={styles.nameAge}>John, 31</Text>
//       {Object.entries(dummyData).map(([sectionTitle, items], index) => (
//         <View key={index} style={styles.section}>
//           <Text style={styles.sectionTitle}>{sectionTitle}</Text>
//           {items.map((item, index) => (
//             <Text key={index} style={styles.itemText}>
//               {item}
//             </Text>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   profilePictureContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   profilePicture: {
//     width: '100%',
//     height: '100%',
//   },
//   nameAge: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   section: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   itemText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default Home;
