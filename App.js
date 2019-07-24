import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Header, Colors } from 'react-native/Libraries/NewAppScreen';

import Camera from './src/components/Camera';

export default class BlinkApp extends Component {
  constructor(props) {
    super(props);
    this.enterCamera = this.enterCamera.bind(this);
    this.exitCamera = this.exitCamera.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);

    this.styles = StyleSheet.create({
      engine: {
        position: 'absolute',
        right: 0
      },
      body: {
        backgroundColor: Colors.white,
        flex: 1
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark
      },
      highlight: {
        fontWeight: '700'
      },
      footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right'
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 100,
        marginTop: 16,
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
      returnValue = (<ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Header />
        <View style={this.styles.body}>
          <View style={this.styles.sectionContainer}>
            <Text style={this.styles.sectionTitle}>
              {this.state.isShowingText}
            </Text>
          </View>
          <View style={this.styles.container}>
            <TouchableOpacity
              style={this.styles.button}
              onPress={this.enterCamera}
            >
              <Text>Open Camera</Text>
            </TouchableOpacity>
          </View>

          <View style={this.styles.container}>
            <TouchableOpacity
              style={this.styles.button}
              onPress={this.confirmPhoto}
            >
              <Text>Confirm Photo (Test)</Text>
            </TouchableOpacity>
            <Text>{JSON.stringify(this.state.photoResponse)}</Text>
          </View>

        </View>
      </ScrollView>);
    }
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          {returnValue}
        </SafeAreaView>
      </Fragment>
    );
  }
}
