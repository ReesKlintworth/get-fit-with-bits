import React from 'react';
import { Text, View, TouchableOpacity, Vibration, Image } from 'react-native';
import { Camera, Permissions, FileSystem, CameraObject } from 'expo';
import { SafeAreaView } from 'react-navigation';
import sharedStyles from '../sharedStyles';
import Colors from '../../Colors';
import Preview from './Preview';
import { STORAGE_DIR, TEMP_PATH } from './constants';
import { NavigationProps } from '../../navigation/rootNavigation';

const CAMERA_BACK = 'back';
// const CAMERA_FRONT = 'front';

interface StateProps {
  workoutId: string;
}

type OwnProps = NavigationProps;

type Props = StateProps & OwnProps;

interface LocalState {
  type: string;
  hasCameraPermission: null | boolean;
  showImage: boolean;
}

export default class CameraComponent extends React.Component<
  Props,
  LocalState
> {
  camera: CameraObject | null;

  constructor(props: any) {
    super(props);

    this.camera = null;
    this.state = {
      type: CAMERA_BACK,
      hasCameraPermission: null,
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
      const imageDestination = `${FileSystem.documentDirectory}${TEMP_PATH}`;
      this.camera.takePictureAsync({}).then(data => {
        return FileSystem.moveAsync({
          from: data.uri,
          to: imageDestination,
        }).then(() => {
          Vibration.vibrate(100, false);
          this.setState({
            showImage: true,
          });
        });
      });
    }
  };

  acceptPhoto = (tempUri: string) => {
    const now = new Date().getMilliseconds();
    const finalDestination = `${
      FileSystem.documentDirectory
    }${STORAGE_DIR}/${now}.jpg`;
    FileSystem.moveAsync({
      from: tempUri,
      to: finalDestination,
    });
  };

  declinePhoto = () => {
    this.setState({ showImage: false });
  };

  renderCamera = () => {
    return (
      <Camera
        ref={(ref: any) => {
          this.camera = ref;
        }}
        style={{ flex: 1 }}
        type={this.state.type}>
        <SafeAreaView style={sharedStyles.safeArea}>
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
          </View>
        </SafeAreaView>
      </Camera>
    );
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return this.renderNoPermissions();
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      const imageUri = `${FileSystem.documentDirectory}${TEMP_PATH}`;
      return (
        <View style={{ flex: 1 }}>
          {this.state.showImage ? (
            <Preview
              imageUri={imageUri}
              acceptPhoto={this.acceptPhoto}
              declinePhoto={this.declinePhoto}
            />
          ) : (
            this.renderCamera()
          )}
        </View>
      );
    }
  }
}
