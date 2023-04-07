import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const dummyData = {
  Hobbies: ['Reading', 'Gardening', 'Cooking'],
  Goals: ['Learn a new language', 'Travel to Europe'],
  Preferences: ['Vegan', 'Morning person'],
  FavorCategories: ['Help with moving', 'Pet sitting'],
  UpcomingTrips: ['New York City', 'San Francisco'],
};

const HomePage = () => {
  const handleProfilePicturePress = () => {
    // Implement the function to open the camera
    console.log('Profile picture pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleProfilePicturePress} style={styles.profilePictureContainer}>
        <Image
          source={require('./assets/icon.png')} // Replace with the path to your placeholder image
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <Text style={styles.nameAge}>John, 31</Text>
      {Object.entries(dummyData).map(([sectionTitle, items], index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          {items.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  nameAge: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HomePage;
