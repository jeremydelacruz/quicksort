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
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
      },
      highlight: {
        fontWeight: '700',
      },
    });

    this.state = {
      isShowingText: 'Loading...',
    };
  }

  componentDidMount() {
    fetch('https://quicksort-api.azurewebsites.net/api/?name=Gui')
      .then(response => response.json())
      .then(response => {
        this.setState({
          isShowingText: response,
        });
      });
  }

  onPressButton() {
    Alert.alert('You tapped the button!');
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View>
            <View>
              <Text style={this.styles.sectionTitle}>{this.state.isShowingText}</Text>
            </View>
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
