import React from 'react';
import { Text, View, TouchableOpacity, Vibration, Image } from 'react-native';
import { Camera, Permissions, FileSystem, CameraObject } from 'expo';
import { SafeAreaView } from 'react-navigation';
import sharedStyles from '../sharedStyles';
import Colors from '../../Colors';
import Preview from './Preview';
import { STORAGE_DIR, TEMP_PATH } from './constants';
import { changeImage } from '../../redux/actions';
import { NavigationProps } from '../../navigation/rootNavigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from '../../redux';

const CAMERA_BACK = 'back';
const CAMERA_FRONT = 'front';

interface StateProps {
  workoutId: string;
}

interface ActionProps {
  readonly changeImage: (uri: string) => void;
}

type OwnProps = NavigationProps;

type Props = ActionProps & StateProps & OwnProps;

interface LocalState {
  type: string;
  hasCameraPermission: null | boolean;
  showImage: boolean;
}

class CameraComponent extends React.Component<Props, LocalState> {
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
    }).then(() => {
      this.props.changeImage(finalDestination);
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

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    changeImage: bindActionCreators(changeImage, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(CameraComponent);
