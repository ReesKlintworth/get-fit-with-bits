import React from 'react';
import { View, SafeAreaView, Text, TextInput, Button } from 'react-native';
import { NavigationProps } from '../navigation/rootNavigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addWorkout } from '../redux/actions';
import { Dispatch } from '../redux';

interface ActionProps {
  readonly addWorkout: (name: string, date: Date) => void;
}

type Props = ActionProps & NavigationProps;

class NewWorkout extends React.PureComponent<Props> {
  addWorkout = () => {
    this.props.addWorkout('My Cool Workout', new Date());
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'green',
          alignItems: 'center',
        }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={{ marginTop: 80 }}>New Workout</Text>
          <TextInput />
          <Button title="Save" onPress={this.addWorkout} />
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    addWorkout: bindActionCreators(addWorkout, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewWorkout);
