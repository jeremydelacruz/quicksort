import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';

import Logo from 'react-native/Libraries/NewAppScreen/components/logo.png';

export default class MainScreenButton extends Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      buttonContainer: {
        paddingTop: 50,
        alignItems: 'center',
      },
      buttonText: {
        padding: 20,
      },
      background: {
        paddingHorizontal: 32,
        paddingVertical: 20,
        width: 250,
        backgroundColor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#003632',
      },
      logo: {
        opacity: 0.10,
        overflow: 'visible',
        marginLeft: -65,
        resizeMode: 'contain',
        transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
      },
      textANDROID: {
        fontSize: 25,
        textAlign: 'center',
        color: '#003632',
        fontFamily: 'notoserif',
      },
      textIOS: {
        fontSize: 25,
        textAlign: 'center',
        color: '#003632',
        fontFamily: 'HelveticaNeue-Thin',
      },
    });
  }

  fontPlatform() {
    if(Platform.OS === 'ios') {
      return this.styles.textIOS;
    }
    else {
      return this.styles.textANDROID;
    }
  }

  render() {
    return (
      <View style={this.styles.buttonContainer}>
        <TouchableOpacity onPress={this.props.onPressButton}>
          <ImageBackground
            accessibilityRole={'image'}
            source={this.props.image || Logo}
            style={this.styles.background}
            imageStyle={this.styles.logo}
          >
            <Text style={this.fontPlatform()}>{this.props.displayText}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
