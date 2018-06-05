import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { NavigationProps } from '../../navigation/rootNavigation';
import { values } from '../../util';

import Button from '../Button';
import WorkoutList from '../WorkoutList';
import { Workout } from '../../types';

import styles from './style';
import sharedStyles from '../sharedStyles';

interface StateProps {
  readonly workouts: Workout[];
}

type Props = StateProps & NavigationProps;

class Home extends React.PureComponent<Props> {
  static navigationOptions = {
    title: 'Get Fit with Bits',
  };

  newWorkout = () => {
    // TODO
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

const mapStateToProps = (state: AppState): StateProps => {
  const { workouts } = state;
  const workoutsArray = values(workouts);
  return {
    workouts: workoutsArray,
  };
};

export default connect(mapStateToProps)(Home);
