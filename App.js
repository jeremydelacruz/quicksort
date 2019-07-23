import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default class BlinkApp extends Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      scrollView: {
        backgroundColor: Colors.lighter,
      },
      engine: {
        position: 'absolute',
        right: 0,
      },
      body: {
        backgroundColor: Colors.white,
        flex: 0.2,
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
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
      footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
      },
    });

    this.state = {
      isShowingText: 'Loading...',
    };
  }

  componentDidMount(){
    fetch('https://quicksort-api.azurewebsites.net/api/?name=Gui')
        .then(response => response.json())
        .then(response => {
          this.setState({
            isShowingText: response,
          });
        });
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={this.styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={this.styles.engine}>
                <Text style={this.styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={this.styles.body}>
              <View style={this.styles.sectionContainer}>
                <Text style={this.styles.sectionTitle}>{this.state.isShowingText}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}
