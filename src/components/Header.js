import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      header: {
        backgroundColor: '#01796F',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
      },
      appNameTextANDROID: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        color: 'white',
        fontSize: 48,
      },
      appNameTextIOS: {
        fontWeight: 'bold',
        fontFamily: 'HelveticaNeue-Bold',
        color: 'white',
        fontSize: 48,
      },
    });
  }

  fontPlatform() {
    if(Platform.OS === 'ios') {
      return this.styles.appNameTextIOS;
    }
    else {
      return this.styles.appNameTextANDROID;
    }
  }

  render() {
    return (
      <View style={this.styles.header}>
        <Text style={this.fontPlatform()}>QuickSort</Text>
      </View>
    );
  }
}
