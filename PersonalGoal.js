// PersonalGoalsPage.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const PersonalGoalsPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
  };

  const handleEditItem = (index, newValue) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return newValue;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Goals</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <TextInput
            style={styles.itemText}
            value={item}
            onChangeText={(text) => handleEditItem(index, text)}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(index)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TextInput
        style={styles.newItemInput}
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Add new goal"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Goal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  newItemInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
        backgroundColor: '#6374D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default PersonalGoalsPage;

