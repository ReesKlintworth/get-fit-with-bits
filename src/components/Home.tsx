import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newWorkout } from '../redux/actions';
import { Dispatch } from '../redux';
import { NavigationProps } from '../navigation/rootNavigation';

interface ActionProps {
  readonly newWorkout: () => void;
}

type Props = ActionProps & NavigationProps;

class Home extends React.PureComponent<Props> {
  newWorkout = () => {
    this.props.newWorkout();
  };

  render() {
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: 'blue' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Button color="red" title="New Workout" onPress={this.newWorkout} />
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

export default connect(null, mapDispatchToProps)(Home);
