/* eslint-disable no-inner-declarations */
import React, { Component } from 'react';
import {
  Platform,
  PermissionsAndroid,
  Alert,
  View,
  Text,
  StyleSheet
} from 'react-native';

import { CameraKitCameraScreen } from 'react-native-camera-kit';
import RNFS from 'react-native-fs';

import FlashAutoIcon from '../images/flashAutoIcon.png';
import FlashOnIcon from '../images/flashOnIcon.png';
import FlashOffIcon from '../images/flashOffIcon.png';
import CameraFlipIcon from '../images/cameraFlipIcon.png';
import CameraCaptureIcon from '../images/cameraCaptureIcon.png';

export default class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPermitted: false,
    };

    this.styles = StyleSheet.create({
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black'
      },
    });
  }

  componentDidMount() {
    this.onPress();
  }

  onPress() {
    const that = this;
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'CameraExample App Camera Permission',
              message: 'CameraExample App needs access to your camera ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            // Calling the WRITE_EXTERNAL_STORAGE permission function
            requestExternalWritePermission();
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      async function requestExternalWritePermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'CameraExample App External Storage Write Permission',
              message:
                'CameraExample App needs access to Storage data in your SD Card ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            // Calling the READ_EXTERNAL_STORAGE permission function
            requestExternalReadPermission();
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Write permission err', err);
          console.warn(err);
        }
      }
      async function requestExternalReadPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'CameraExample App Read Storage Read Permission',
              message: 'CameraExample App needs access to your SD Card ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If READ_EXTERNAL_STORAGE Permission is granted
            // changing the state to re-render and open the camera
            // in place of activity indicator
            that.setState({ isPermitted: true });
          } else {
            alert('READ_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Read permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      this.setState({ isPermitted: true });
    }
  }

  onBottomButtonPressed(event) {
    if (event.type === 'left') {
      this.props.onExitCamera(null);
    } if (event.type === 'right') {
      this.confirmPhoto(event.captureImages[0].uri);
    }
  }

  confirmPhoto = async (path) => {
    const contents = await RNFS.readFile(path, 'base64');
    Alert.alert(
      'Confirm Photo',
      'Do you want to submit this photo to be analyzed?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.onExitCamera(contents);
          }
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

  render() {
    if (this.state.isPermitted) {
      return (
        <CameraKitCameraScreen
          // Buttons to perform action done and cancel
          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
          flashImages={{
            // Flash button images
            on: FlashOnIcon,
            off: FlashOffIcon,
            auto: FlashAutoIcon,
          }}
          cameraFlipImage={CameraFlipIcon}
          captureButtonImage={CameraCaptureIcon}
        />
      );
    }

    return (
      <View style={this.styles.sectionContainer}>
        <Text style={this.styles.sectionTitle}>
          {this.state.isShowingText}
        </Text>
      </View>
    );
  }
}
