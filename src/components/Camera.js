/* eslint-disable no-inner-declarations */
import React, { Component } from 'react';
import {
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import { CameraKitCameraScreen } from 'react-native-camera-kit';

import Logo from 'react-native/Libraries/NewAppScreen/components/logo.png';

export default class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPermitted: false,
    };
  }
  componentDidMount() {
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
      this.state = { isPermitted: true };
    }
  }
  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    if (event.type === 'left') {
      this.props.onExitCamera();
      this.setState({ isPermitted: false });
    } else {
      Alert.alert(
        event.type,
        captureImages,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <CameraKitCameraScreen
        style={{ flex: 1, resizeMode: 'cover' }}
        // Buttons to perform action done and cancel
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
        flashImages={{
        // Flash button images
          on: Logo,
          off: Logo,
          auto: Logo,
        }}
        cameraFlipImage={Logo}
        captureButtonImage={Logo}
      />
    );
  }
}
