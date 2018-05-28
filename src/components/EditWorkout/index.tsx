import React from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import { NavigationProps } from '../../navigation/rootNavigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  saveNewWorkout,
  saveExistingWorkout,
  deleteWorkout,
} from '../../redux/actions';
import { Dispatch, AppState } from '../../redux';
import { Workout } from '../../types';
import { getWorkout } from '../../redux/selectors';
import { AppRoutes } from '../../navigation/routes';

import Button from '../Button';
import Input from '../Input';

import styles from './style';
import sharedStyles from '../sharedStyles';

type OwnProps = NavigationProps;

interface StateProps {
  workout: Workout | null | undefined;
}

interface ActionProps {
  readonly saveNewWorkout: (name: string, type: string, date: Date) => void;
  readonly saveExistingWorkout: (
    workoutId: string,
    name: string,
    type: string
  ) => void;
  readonly deleteWorkout: (workoutId: string) => void;
}

interface LocalState {
  name: string;
  type: string;
  message: string | null;
}

type Props = ActionProps & OwnProps & StateProps;

class EditWorkout extends React.PureComponent<Props, LocalState> {
  static navigationOptions = {
    title: 'Edit Workout',
  };

  constructor(props: Props) {
    super(props);
    this.nameChanged = this.nameChanged.bind(this);

    const name = !!this.props.workout
      ? this.props.workout.name
      : `${new Date().toLocaleDateString()} Workout`;
    const type = !!this.props.workout ? this.props.workout.type : '';

    this.state = {
      name,
      type,
      message: null,
    };
  }

  saveWorkout = () => {
    const { workout } = this.props;
    const { name, type } = this.state;
    if (!type.length) {
      this.setState({ message: 'Please enter a workout type.' });
      return;
    } else {
      this.setState({ message: null });
    }
    if (workout) {
      this.props.saveExistingWorkout(workout.id, name, type);
    } else {
      this.props.saveNewWorkout(name, type, new Date());
    }
  };

  deleteWorkout = () => {
    const { workout } = this.props;
    if (workout) {
      this.props.deleteWorkout(workout.id);
    }
  };

  nameChanged = (text: string) => {
    this.setState({
      name: text,
    });
  };

  typeChanged = (text: string) => {
    this.setState({
      type: text,
    });
  };

  goToCamera = () => {
    this.props.navigation.navigate({
      routeName: AppRoutes.Camera,
    });
  };

  render() {
    const buttonDisabled =
      this.state.name.trim().length === 0 ||
      this.state.type.trim().length === 0;
    const isEditing = !!this.props.workout;
    const buttonText = isEditing ? 'Save' : 'Create';

    return (
      <View style={styles.container}>
        <SafeAreaView style={sharedStyles.safeArea}>
          <View style={styles.scrollView}>
            {!!this.state.message ? (
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{this.state.message}</Text>
              </View>
            ) : null}
            <Text style={styles.prompt}>Workout Name</Text>
            <Input
              value={this.state.name}
              onChangeText={this.nameChanged}
              style={styles.input}
            />
            <Text style={styles.prompt}>Workout Type</Text>
            <Input
              value={this.state.type}
              placeholder="Run, swim, weights, etc."
              onChangeText={this.typeChanged}
              style={styles.input}
            />
            <Button
              style={styles.button}
              onPress={this.goToCamera}
              title="Add Image"
            />
            <Button
              style={styles.button}
              disabled={buttonDisabled}
              onPress={this.saveWorkout}
              title={buttonText}
            />
            {isEditing ? (
              <Button
                style={styles.button}
                onPress={this.deleteWorkout}
                title="Delete"
                destructive={true}
              />
            ) : null}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const DEFAULT_STATE_PROPS: StateProps = {
  workout: null,
};
const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const workoutId: string | undefined = ownProps.navigation.getParam(
    'workoutId'
  );
  if (!workoutId) {
    return DEFAULT_STATE_PROPS;
  }

  const workout: Workout | undefined = getWorkout(state, workoutId);
  return {
    workout,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    saveNewWorkout: bindActionCreators(saveNewWorkout, dispatch),
    saveExistingWorkout: bindActionCreators(saveExistingWorkout, dispatch),
    deleteWorkout: bindActionCreators(deleteWorkout, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkout);
