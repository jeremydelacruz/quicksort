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
        flex: 0.15,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
      },
      appNameText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24,
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
