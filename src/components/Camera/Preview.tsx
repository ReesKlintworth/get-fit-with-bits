import React from 'react';
import { Image, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../../Colors';
import sharedStyles from '../sharedStyles';

interface Props {
  imageUri: string;
  acceptPhoto: (uri: string) => void;
  declinePhoto: () => void;
}
export default class GalleryScreen extends React.PureComponent<Props> {
  acceptPhoto = () => {
    this.props.acceptPhoto(this.props.imageUri);
  };

  render() {
    const { imageUri, declinePhoto } = this.props;
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'black',
          justifyContent: 'flex-end',
        }}>
        <Image
          style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
          source={{
            uri: imageUri,
          }}
        />
        <SafeAreaView style={sharedStyles.safeArea}>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 16,
            }}>
            <TouchableOpacity onPress={this.acceptPhoto}>
              <Image
                source={require('../../resources/accept.png')}
                style={{
                  height: 44,
                  width: 44,
                  tintColor: Colors.deBtnStandardPrimaryLabel,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={declinePhoto}
              style={{ position: 'absolute', left: 0, bottom: 0 }}
              hitSlop={{ left: 10, top: 10, right: 10, bottom: 10 }}>
              <Image
                source={require('../../resources/reject.png')}
                style={{
                  height: 32,
                  width: 32,
                  tintColor: Colors.deBtnStandardPrimaryLabel,
                }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
