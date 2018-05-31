import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import { NavigationProps } from '../../navigation/rootNavigation';
import { connect } from 'react-redux';
import { AppRoutes } from '../../navigation/routes';

import Button from '../Button';
import Input from '../Input';

import styles from './style';
import sharedStyles from '../sharedStyles';

type OwnProps = NavigationProps;

interface StateProps {
  workoutId: null | string;
  name: string;
  type: string;
  imageUri: string | null;
}

interface LocalState {
  message: string | null;
}

type Props = OwnProps & StateProps;

class EditWorkout extends React.PureComponent<Props, LocalState> {
  static navigationOptions = {
    title: 'Edit Workout',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      message: null,
    };
  }

  saveWorkout = () => {
    const { type } = this.props;
    if (!type.length) {
      this.setState({ message: 'Please enter a workout type.' });
      return;
    } else {
      this.setState({ message: null });
    }
  };

  nameChanged = () => {
    // TODO
  };

  typeChanged = () => {
    // TODO
  };

  goToCamera = () => {
    this.props.navigation.navigate({
      routeName: AppRoutes.Camera,
    });
  };

  render() {
    const { name, type, imageUri } = this.props;
    const buttonDisabled = name.trim().length === 0 || type.trim().length === 0;
    const isEditing = !!this.props.workoutId;
    const buttonText = isEditing ? 'Save' : 'Create';
    const imageButtonText = !!imageUri ? 'Change Image' : 'Add Image';

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={sharedStyles.safeArea}>
            <ScrollView style={styles.content}>
              {!!this.state.message ? (
                <View style={styles.messageContainer}>
                  <Text style={styles.message}>{this.state.message}</Text>
                </View>
              ) : null}
              <Text style={styles.prompt}>Workout Name</Text>
              <Input
                value={name}
                onChangeText={this.nameChanged}
                style={styles.input}
              />
              <Text style={styles.prompt}>Workout Type</Text>
              <Input
                value={type}
                onChangeText={this.typeChanged}
                style={styles.input}
              />
              {!!imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : null}
              <Button
                style={styles.button}
                onPress={this.goToCamera}
                title={imageButtonText}
              />
              <Button
                style={styles.button}
                disabled={buttonDisabled}
                onPress={this.saveWorkout}
                title={buttonText}
              />
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const DEFAULT_STATE_PROPS: StateProps = {
  workoutId: null,
  name: '',
  type: '',
  imageUri: null,
};
const mapStateToProps = (): StateProps => {
  return DEFAULT_STATE_PROPS;
};

export default connect(mapStateToProps)(EditWorkout);
