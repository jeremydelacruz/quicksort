import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
<<<<<<< HEAD
  TouchableOpacity,
=======
>>>>>>> 037378db9f73fa738323b9449db12cfc5daa582e
  Alert
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Camera from './src/components/Camera';
import Header from './src/components/Header';
import MainScreenButton from './src/components/MainScreenButton';

import CameraIcon from './src/images/cameraIcon.png';
import LearnMoreIcon from './src/images/learnMoreIcon.png';

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.enterCamera = this.enterCamera.bind(this);
    this.exitCamera = this.exitCamera.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);

    this.styles = StyleSheet.create({
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black
      },
      sectionDescription: {
        marginTop: 35,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        fontWeight: '400',
        color: Colors.dark,
        backgroundColor: Colors.light,
        textAlign: 'center',
        fontFamily: 'sans-serif-light',
      },
      highlight: {
        fontWeight: '700'
      },
    });

    this.state = {
      isShowingText: 'Loading...',
      isCameraOpen: false,
      photoResponse: '',
    };
  }

  enterCamera() {
    this.setState({
      isCameraOpen: true,
    });
  }

  exitCamera() {
    this.setState({
      isCameraOpen: false,
    });
  }

  confirmPhoto = () => {
    Alert.alert(
      'Confirm Photo',
      'Do you want to submit this photo to be analyzed?',
      [
        {
          text: 'Yes',
          onPress: () => this.sendPhoto()
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  sendPhoto = () => {
    let endpoint = "https://quicksort-api.azurewebsites.net/api/url?method=analyze";
    let payload = {
      url: "http://www.altacrystalresort.com/images/uploads/homepage/home-rainier-fall.jpg"
    };
    let options = {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    };

    fetch(endpoint, options)
      .then(response => response.json())
      .then(response => {
        this.setState({
          photoResponse: response
        });
      });
  }

  render() {
    let returnValue = '';
    if (this.state.isCameraOpen) {
      returnValue = (<Camera
        onExitCamera={this.exitCamera}
      />);
    } else {
      returnValue = (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <Header />
          <View>
            <Text style={this.styles.sectionDescription}>
              Take a picture down below to identify your object as Compost, Recycle, or Landfill.
            </Text>
            <MainScreenButton
              displayText="Take a Picture"
              onPressButton={this.enterCamera}
              image={CameraIcon}
            />
            <MainScreenButton
              displayText="Learn More"
              onPressButton={this.confirmPhoto}
              image={LearnMoreIcon}
            />
          </View>
        </ScrollView>);
    }
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
          {returnValue}
        </SafeAreaView>
      </Fragment>
    );
  }
}
