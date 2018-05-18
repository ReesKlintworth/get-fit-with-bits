import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newWorkout } from '../redux/actions';
import { Dispatch, AppState } from '../redux';
import { NavigationProps } from '../navigation/rootNavigation';
import { values } from '../util';

import WorkoutList from './WorkoutList';
import { Workout } from '../types';

interface ActionProps {
  readonly newWorkout: () => void;
}

interface StateProps {
  readonly workouts: Workout[];
}

type Props = ActionProps & StateProps & NavigationProps;

class Home extends React.PureComponent<Props> {
  newWorkout = () => {
    this.props.newWorkout();
  };

  render() {
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <WorkoutList workouts={this.props.workouts} />
          <Button title="Add Workout" onPress={this.newWorkout} />
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    newWorkout: bindActionCreators(newWorkout, dispatch),
  };
};

const mapStateToProps = (state: AppState): StateProps => {
  const { workouts } = state;
  const workoutsArray = values(workouts);
  return {
    workouts: workoutsArray,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
