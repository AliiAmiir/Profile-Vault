import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveEducation, updateEducation, deleteEducation, fetchUserEducation } from '../repository/educationRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import { EducationForm, EducationDisplayForm, EducationUpdateForm } from '../components/EducationForm';

export default class Education extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newInstitute: '',
      newDegree: '',
      newEducationDateFrom: new Date(),
      newEducationDateTo: new Date(),
      showDateFromPicker: false,
      showDateToPicker: false,
      errors: {},
      savedEducation: [],
      showEducationInputForm: false,
      showEditEducationForm: false,
    }
  }

  getDefaultState = () => {
    return {
      newInstitute: '',
      newDegree: '',
      newEducationDateFrom: new Date(),
      newEducationDateTo: new Date(),
      showDateFromPicker: false,
      showDateToPicker: false,
      showEducationInputForm: false,
    }
  };

  handleShowEditEducationForm = () => {
    this.setState({ showEditEducationForm: !this.state.showEditEducationForm });
  };

  handleShowDateFromPicker = () => {
    this.setState({ showDateFromPicker: !this.state.showDateFromPicker });
  };

  handleShowDateToPicker = () => {
    this.setState({ showDateToPicker: !this.state.showDateToPicker });
  };

  handleShowDateFromPickerByKey = (key) => {
    let index = this.state.savedEducation.findIndex(x => x.key === key);
    let savedEducation = this.state.savedEducation;

    savedEducation[index].showDateFromPicker = !savedEducation[index].showDateFromPicker;
    this.setState({ savedEducation: savedEducation });
  };

  handleDateFromChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedEducation.findIndex(x => x.key === key);
    let savedEducation = this.state.savedEducation;

    savedEducation[index].dateFrom = selectedDate || savedEducation[index].dateFrom;

    this.setState({ savedEducation: savedEducation });
  }

  handleShowDateToPickerByKey = (key) => {
    let index = this.state.savedEducation.findIndex(x => x.key === key);
    let savedEducation = this.state.savedEducation;

    savedEducation[index].showDateToPicker = !savedEducation[index].showDateToPicker;
    this.setState({ savedEducation: savedEducation });
  };

  handleDateToChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedEducation.findIndex(x => x.key === key);
    let savedEducation = this.state.savedEducation;

    savedEducation[index].dateTo = selectedDate || savedEducation[index].dateTo;

    this.setState({ savedEducation: savedEducation });
  }

  handleShowEducationInputForm = () => {
    this.setState({ showEducationInputForm: !this.state.showEducationInputForm });
  };

  handleDateFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newEducationDateFrom;
    this.setState({ newEducationDateFrom: currentDate });
  };

  handleDateToChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newEducationDateTo;
    this.setState({ newEducationDateTo: currentDate });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedEducation = this.state.savedEducation;
    let index = savedEducation.findIndex(x => x.key === key);
    let valueAtIndex = savedEducation[index];
    valueAtIndex[value.field] = value.value;

    savedEducation[index] = valueAtIndex;

    // Add validation
    this.setState({ savedEducation: savedEducation });
  };


  handleSaveEducation = async () => {
    try {
      const educationDetails = {
        institute: this.state.newInstitute,
        degree: this.state.newDegree,
        dateFrom: this.state.newEducationDateFrom,
        dateTo: this.state.newEducationDateTo,
      };

      const response = await saveEducation(auth.currentUser.uid, educationDetails);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Education');
        let defaultState = this.getDefaultState();
        this.setState(defaultState)
      } else {
        Alert.alert(response.message || 'Failed to save Education');
        let defaultState = this.getDefaultState();
        this.setState(defaultState)
      }

      await this.fetchUserEducation();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleUpdateEducation = async (key) => {
    try {
      let savedEducation = this.state.savedEducation;
      let index = savedEducation.findIndex(x => x.key === key);
      let education = savedEducation[index];

      const response = await updateEducation(key, education);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Education');
      } else {
        Alert.alert(response.message || 'Failed to Update Education');
      }

      await this.fetchUserEducation();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleDeleteEducation = async (key) => {
    try {
      const response = await deleteEducation(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Education');
      } else {
        Alert.alert(response.message || 'Failed to Delete Education');
      }

      await this.fetchUserEducation();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  fetchUserEducation = async () => {
    try {
      const response = await fetchUserEducation(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedEducation: response.data });
      } else {
        Alert.alert(response.message || 'Failed to Fetch Education');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  componentDidMount() {
    this.fetchUserEducation();
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, { justifyContent: 'flex-start' }]}>
        <View style={containerStyles.formContainer}>
          {!this.state.showEducationInputForm && (
            <FormButton title='Add an Education' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEducationInputForm} />
          )}

          {this.state.showEducationInputForm && (
            <EducationForm
              institute={this.state.newInstitute}
              degree={this.state.newDegree}
              dateFrom={this.state.newEducationDateFrom}
              dateTo={this.state.newEducationDateTo}
              showDatePicker={this.state.showDateFromPicker}
              handleShowDatePicker={this.handleShowDateFromPicker}
              handleDateChange={this.handleDateFromChange}
              showDateToPicker={this.state.showDateToPicker}
              handleShowDateToPicker={this.handleShowDateToPicker}
              handleDateToChange={this.handleDateToChange}
              handleChange={this.handleChange}
              onFormClose={this.handleShowEducationInputForm}
              onFormSubmit={this.handleSaveEducation}
            />
          )}

          {this.state.showEditEducationForm && !this.state.showEducationInputForm && (<FormButton title='Done' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditEducationForm} />)}

          {!this.state.showEditEducationForm && !this.state.showEducationInputForm && (<FormButton title='Edit Education' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditEducationForm} />)}

          {!this.state.showEditEducationForm && !this.state.showEducationInputForm && (
            <FlatList data={this.state.savedEducation} renderItem={({ item }) => (
              <EducationDisplayForm
                institute={item.institute}
                degree={item.degree}
                dateFrom={item.dateFrom}
                dateTo={item.dateTo}
              />
            )}
              keyExtractor={item => item.key}
            />
          )}

          {this.state.showEditEducationForm && !this.state.showEducationInputForm && (
            <FlatList data={this.state.savedEducation} renderItem={({ item }) => (
              <EducationUpdateForm
                institute={item.institute}
                degree={item.degree}
                dateFrom={item.dateFrom}
                dateTo={item.dateTo}
                itemKey={item.key}
                handleChange={this.handleUpdateChange}
                onFormSubmit={this.handleUpdateEducation}
                onPressDelete={this.handleDeleteEducation}
                showDatePicker={item.showDateFromPicker}
                handleShowDatePicker={this.handleShowDateFromPickerByKey}
                handleDateChange={this.handleDateFromChangeByKey}
                showDateToPicker={item.showDateToPicker}
                handleShowDateToPicker={this.handleShowDateToPickerByKey}
                handleDateToChange={this.handleDateToChangeByKey}
              />
            )}
              keyExtractor={item => item.key}
            />
          )}
        </View>
      </View>
    );
  }
}
