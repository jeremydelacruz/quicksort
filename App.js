import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Header from './src/components/Header';
import MainScreenButton from './src/components/MainScreenButton';

import CameraIcon from './src/images/cameraIcon.png';
import LearnMoreIcon from './src/images/learnMoreIcon.png';

export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
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
        fontWeight: '700',
      },
    });

    this.state = {
      isShowingText: 'Loading...',
    };
  }

  onPressButton() {
    Alert.alert('You tapped the button!');
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <Header />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View>
            {/* <View>
              <Text style={this.styles.sectionTitle}>{this.state.isShowingText}</Text>
            </View> */}
            <Text style={this.styles.sectionDescription}>Take a picture down below to identify your object as Compost, Recycle, or Landfill.</Text>
            <MainScreenButton
              displayText="Take a Picture"
              onPressButton={this.onPressButton}
              image={CameraIcon}
            />
            <MainScreenButton
              displayText="Learn More"
              onPressButton={this.onPressButton}
              image={LearnMoreIcon}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
