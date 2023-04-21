import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveJob, updateJob, deleteJob, fetchUserJobs } from '../repository/jobRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import { JobForm, JobDisplayForm, JobUpdateForm } from '../components/JobForm';

export default class Job extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newCompany: '',
      newTitle: '',
      newJobDateFrom: new Date(),
      newJobDateTo: new Date(),
      showDateFromPicker: false,
      showDateToPicker: false,
      errors: {},
      savedJobs: [],
      showJobInputForm: false,
      showEditJobForm: false,
    }
  }

  getDefaultState = () => {
    return {
      newCompany: '',
      newTitle: '',
      newJobDateFrom: new Date(),
      newJobDateTo: new Date(),
      showDateFromPicker: false,
      showDateToPicker: false,
      showJobInputForm: false,
    }
  };

  handleShowEditJobForm = () => {
    this.setState({ showEditJobForm: !this.state.showEditJobForm });
  };

  handleShowDateFromPicker = () => {
    this.setState({ showDateFromPicker: !this.state.showDateFromPicker });
  };

  handleShowDateToPicker = () => {
    this.setState({ showDateToPicker: !this.state.showDateToPicker });
  };

  handleShowDateFromPickerByKey = (key) => {
    let index = this.state.savedJobs.findIndex(x => x.key === key);
    let savedJobs = this.state.savedJobs;

    savedJobs[index].showDateFromPicker = !savedJobs[index].showDateFromPicker;
    this.setState({ savedJobs: savedJobs });
  };

  handleDateFromChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedJobs.findIndex(x => x.key === key);
    let savedJobs = this.state.savedJobs;

    savedJobs[index].dateFrom = selectedDate || savedJobs[index].dateFrom;

    this.setState({ savedJobs: savedJobs });
  }

  handleShowDateToPickerByKey = (key) => {
    let index = this.state.savedJobs.findIndex(x => x.key === key);
    let savedJobs = this.state.savedJobs;

    savedJobs[index].showDateToPicker = !savedJobs[index].showDateToPicker;
    this.setState({ savedJobs: savedJobs });
  };

  handleDateToChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedJobs.findIndex(x => x.key === key);
    let savedJobs = this.state.savedJobs;

    savedJobs[index].dateTo = selectedDate || savedJobs[index].dateTo;

    this.setState({ savedJobs: savedJobs });
  }

  handleShowJobInputForm = () => {
    this.setState({ showJobInputForm: !this.state.showJobInputForm });
  };

  handleDateFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newJobDateFrom;
    this.setState({ newJobDateFrom: currentDate });
  };

  handleDateToChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newJobDateTo;
    this.setState({ newJobDateTo: currentDate });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedJobs = this.state.savedJobs;
    let index = savedJobs.findIndex(x => x.key === key);
    let valueAtIndex = savedJobs[index];
    valueAtIndex[value.field] = value.value;

    savedJobs[index] = valueAtIndex;

    // Add validation
    this.setState({ savedJobs: savedJobs });
  };


  handlesaveJob = async () => {
    try {
      const jobDetails = {
        company: this.state.newCompany,
        title: this.state.newTitle,
        dateFrom: this.state.newJobDateFrom,
        dateTo: this.state.newJobDateTo,
      };

      const response = await saveJob(auth.currentUser.uid, jobDetails);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Job');
        let defaultState = this.getDefaultState();
        this.setState(defaultState)
      } else {
        Alert.alert(response.message || 'Failed to save Job');
        let defaultState = this.getDefaultState();
        this.setState(defaultState)
      }

      await this.fetchUserJobs();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleupdateJob = async (key) => {
    try {
      let savedJobs = this.state.savedJobs;
      let index = savedJobs.findIndex(x => x.key === key);
      let job = savedJobs[index];

      const response = await updateJob(key, job);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Job');
      } else {
        Alert.alert(response.message || 'Failed to Update Job');
      }

      await this.fetchUserJobs();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };


  handledeleteJob = async (key) => {
    try {
      const response = await deleteJob(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Job');
      } else {
        Alert.alert(response.message || 'Failed to Delete Job');
      }

      await this.fetchUserJobs();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  fetchUserJobs = async () => {
    try {
      const response = await fetchUserJobs(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedJobs: response.data });
      } else {
        Alert.alert(response.message || 'Failed to Fetch Job');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  componentDidMount() {
    this.fetchUserJobs();
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, { justifyContent: 'flex-start' }]}>
        <View style={containerStyles.formContainer}>
          {!this.state.showJobInputForm && (
            <FormButton title='Add a Job' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowJobInputForm} />
          )}

          {this.state.showJobInputForm && (
            <JobForm
              company={this.state.newCompany}
              title={this.state.newTitle}
              dateFrom={this.state.newJobDateFrom}
              dateTo={this.state.newJobDateTo}
              showDatePicker={this.state.showDateFromPicker}
              handleShowDatePicker={this.handleShowDateFromPicker}
              handleDateChange={this.handleDateFromChange}
              showDateToPicker={this.state.showDateToPicker}
              handleShowDateToPicker={this.handleShowDateToPicker}
              handleDateToChange={this.handleDateToChange}
              handleChange={this.handleChange}
              onFormClose={this.handleShowJobInputForm}
              onFormSubmit={this.handlesaveJob}
            />
          )}

          {this.state.showEditJobForm && !this.state.showJobInputForm && (<FormButton title='Done' onPress={this.handleShowEditJobForm} />)}

          {!this.state.showEditJobForm && !this.state.showJobInputForm && (<FormButton title='Edit Job' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditJobForm} />)}

          {!this.state.showEditJobForm && !this.state.showJobInputForm && (
            <FlatList data={this.state.savedJobs} renderItem={({ item }) => (
              <JobDisplayForm
                company={item.company}
                title={item.title}
                dateFrom={item.dateFrom}
                dateTo={item.dateTo}
              />
            )}
              keyExtractor={item => item.key}
            />
          )}

          {this.state.showEditJobForm && !this.state.showJobInputForm && (
            <FlatList data={this.state.savedJobs} renderItem={({ item }) => (
              <JobUpdateForm
                company={item.company}
                title={item.title}
                dateFrom={item.dateFrom}
                dateTo={item.dateTo}
                itemKey={item.key}
                handleChange={this.handleUpdateChange}
                onFormSubmit={this.handleupdateJob}
                onPressDelete={this.handledeleteJob}
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
