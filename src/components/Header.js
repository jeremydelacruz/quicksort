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
        flex: 0.50,
        backgroundColor: '#01796F',
        alignItems: 'center',
        justifyContent: 'center',
      },
      appNameText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        color: 'white',
        fontSize: 48,
      },
    });
  }

  render() {
    return (
      <View style={this.styles.header}>
        <Text style={this.styles.appNameText}>QuickSort</Text>
      </View>
    );
  }
}
