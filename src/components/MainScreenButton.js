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
        paddingTop: 60,
        alignItems: 'center',
      },
      buttonText: {
        padding: 20,
        color: 'white'
      },
      background: {
        paddingHorizontal: 32,
        paddingVertical: 20,
        width: 250,
        backgroundColor: '#dddddd',
        borderRadius: 4,
        overflow: 'hidden',
      },
      logo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        marginLeft: -32,
        marginBottom: -32,
        flex: 0.5
      },
      text: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: '#585858',
      },
    });
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
            <Text style={this.styles.text}>{this.props.displayText}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
