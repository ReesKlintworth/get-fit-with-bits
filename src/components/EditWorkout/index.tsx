import React from 'react';
import { View, SafeAreaView, Text, Image, ScrollView } from 'react-native';
import { NavigationProps } from '../../navigation/rootNavigation';
import { connect } from 'react-redux';
import { AppRoutes } from '../../navigation/routes';

import Button from '../Button';
import Input from '../Input';

import styles from './style';
import sharedStyles from '../sharedStyles';
import { Dispatch, AppState } from '../../redux';
import { bindActionCreators } from 'redux';
import { changeName, changeType, saveWorkout } from '../../redux/actions';

type OwnProps = NavigationProps;

interface StateProps {
  workoutId: null | string;
  name: string;
  type: string;
  imageUri: string | null;
}

interface ActionProps {
  readonly saveWorkout: (params: { date?: Date; workoutId?: string }) => void;
  readonly changeName: (name: string) => void;
  readonly changeType: (type: string) => void;
}

interface LocalState {
  message: string | null;
}

type Props = OwnProps & StateProps & ActionProps;

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
    const { type, workoutId } = this.props;
    if (!type.length) {
      this.setState({ message: 'Please enter a workout type.' });
      return;
    } else {
      this.setState({ message: null });
    }
    if (workoutId) {
      this.props.saveWorkout({ workoutId });
    } else {
      this.props.saveWorkout({ date: new Date() });
    }
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
              onChangeText={this.props.changeName}
              style={styles.input}
            />
            <Text style={styles.prompt}>Workout Type</Text>
            <Input
              value={type}
              onChangeText={this.props.changeType}
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
const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const workoutId: string | undefined = ownProps.navigation.getParam(
    'workoutId'
  );

  const editWorkout = state.editWorkout;
  return {
    workoutId: workoutId || DEFAULT_STATE_PROPS.workoutId,
    name: editWorkout.name || DEFAULT_STATE_PROPS.name,
    type: editWorkout.type || DEFAULT_STATE_PROPS.type,
    imageUri: editWorkout.imageUri || DEFAULT_STATE_PROPS.imageUri,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    changeName: bindActionCreators(changeName, dispatch),
    changeType: bindActionCreators(changeType, dispatch),
    saveWorkout: bindActionCreators(saveWorkout, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkout);
