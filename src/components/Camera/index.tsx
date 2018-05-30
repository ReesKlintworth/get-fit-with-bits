import React from 'react';
import { Text, View, TouchableOpacity, Vibration, Image } from 'react-native';
import { Camera, Permissions, FileSystem, CameraObject } from 'expo';
import { SafeAreaView } from 'react-navigation';
import sharedStyles from '../sharedStyles';
import Colors from '../../Colors';

const STORAGE_DIR = 'photos';
const CAMERA_BACK = 'back';
const CAMERA_FRONT = 'front';

interface LocalState {
  type: string;
  hasCameraPermission: null | boolean;
  // photoId: number;
  showImage: boolean;
}

export default class CameraComponent extends React.Component<{}, LocalState> {
  camera: CameraObject | null;

  constructor(props: any) {
    super(props);

    this.camera = null;
    this.state = {
      type: CAMERA_BACK,
      hasCameraPermission: null,
      // photoId: 1,
      showImage: false,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + STORAGE_DIR
    ).catch(() => {
      // console.log(e, 'Directory exists');
      return;
    });
  }

  flipCamera = () => {
    this.setState({
      type: this.state.type === CAMERA_BACK ? CAMERA_FRONT : CAMERA_BACK,
    });
  };

  renderNoPermissions = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Text style={{ color: 'white' }}>
          Camera permissions not granted - cannot open camera preview.
        </Text>
      </View>
    );
  };

  takePicture = async () => {
    if (this.camera) {
      this.camera.takePictureAsync({}).then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          // TODO - need to move image to permanent storage once it's accepted
          to: `${FileSystem.documentDirectory}${STORAGE_DIR}/temp`,
        }).then(() => {
          Vibration.vibrate(100, false);
          this.setState({
            // photoId: this.state.photoId + 1,
            showImage: true,
          });
        });
      });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return this.renderNoPermissions();
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView style={sharedStyles.safeArea}>
            <Camera
              ref={(ref: any) => {
                this.camera = ref;
              }}
              style={{ flex: 1, justifyContent: 'flex-end' }}
              type={this.state.type}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 16,
                }}>
                <TouchableOpacity onPress={this.takePicture}>
                  <Image
                    source={require('../../resources/camera.png')}
                    style={{
                      height: 44,
                      width: 44,
                      tintColor: Colors.deBtnStandardPrimaryLabel,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.flipCamera}
                  style={{ position: 'absolute', left: 0, bottom: 0 }}
                  hitSlop={{ left: 10, top: 10, right: 10, bottom: 10 }}>
                  <Image
                    source={require('../../resources/reverse-camera.png')}
                    style={{
                      height: 32,
                      width: 32,
                      tintColor: Colors.deBtnStandardPrimaryLabel,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </Camera>
          </SafeAreaView>
        </View>
      );
    }
  }
}
