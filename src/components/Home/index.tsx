import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newWorkout } from '../../redux/actions';
import { Dispatch, AppState } from '../../redux';
import { NavigationProps } from '../../navigation/rootNavigation';
import { values } from '../../util';

import Button from '../Button';
import WorkoutList from '../WorkoutList';
import { Workout } from '../../types';

import styles from './style';
import sharedStyles from '../sharedStyles';

interface ActionProps {
  readonly newWorkout: () => void;
}

interface StateProps {
  readonly workouts: Workout[];
}

type Props = ActionProps & StateProps & NavigationProps;

class Home extends React.PureComponent<Props> {
  static navigationOptions = {
    title: 'Get Fit with Bits',
  };

  newWorkout = () => {
    this.props.newWorkout();
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={sharedStyles.safeArea}>
          {this.props.workouts.length > 0 ? (
            <WorkoutList workouts={this.props.workouts} />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              }}>
              <Text style={styles.largeText}>Hello.</Text>
              <Text style={styles.smallText}>Add a workout!</Text>
            </View>
          )}

          <Button
            title="Add Workout"
            onPress={this.newWorkout}
            style={styles.button}
          />
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
