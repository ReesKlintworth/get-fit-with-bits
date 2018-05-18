import React from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import { NavigationProps } from '../../navigation/rootNavigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveNewWorkout, saveExistingWorkout } from '../../redux/actions';
import { Dispatch, AppState } from '../../redux';
import { Workout } from '../../types';
import { getWorkout } from '../../redux/selectors';

import Button from '../Button';
import Input from '../Input';

import styles from './style';

type OwnProps = NavigationProps;

interface StateProps {
  workout: Workout | null | undefined;
}

interface ActionProps {
  readonly saveNewWorkout: (name: string, date: Date) => void;
  readonly saveExistingWorkout: (workoutId: string, name: string) => void;
}

interface LocalState {
  name: string;
}

type Props = ActionProps & OwnProps & StateProps;

class EditWorkout extends React.PureComponent<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.nameChanged = this.nameChanged.bind(this);

    const name = !!this.props.workout
      ? this.props.workout.name
      : `${new Date().toLocaleDateString()} Workout`;

    this.state = {
      name,
    };
  }

  saveWorkout = () => {
    const { workout } = this.props;
    if (workout) {
      this.props.saveExistingWorkout(workout.id, this.state.name);
    } else {
      this.props.saveNewWorkout(this.state.name, new Date());
    }
  };

  nameChanged = (text: string) => {
    this.setState({
      name: text,
    });
  };

  render() {
    const buttonDisabled = this.state.name.trim().length === 0;
    const buttonText = !!this.props.workout ? 'Save' : 'Create';

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.prompt}>New Workout</Text>
            <Input
              defaultValue={this.state.name}
              onChangeText={this.nameChanged}
            />
            <Button
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkout);
