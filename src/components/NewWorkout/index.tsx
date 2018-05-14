import React from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import { NavigationProps } from '../../navigation/rootNavigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveNewWorkout } from '../../redux/actions';
import { Dispatch } from '../../redux';

import Button from '../Button';
import Input from '../Input';

import styles from './style';

interface ActionProps {
  readonly saveWorkout: (name: string, date: Date) => void;
}

interface LocalState {
  name: string;
}

type Props = ActionProps & NavigationProps;

class NewWorkout extends React.PureComponent<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.nameChanged = this.nameChanged.bind(this);
    this.state = {
      name: `${new Date().toLocaleDateString()} Workout`,
    };
  }

  addWorkout = () => {
    this.props.saveWorkout(this.state.name, new Date());
  };

  nameChanged = (text: string) => {
    this.setState({
      name: text,
    });
  };

  render() {
    const buttonDisabled = this.state.name.trim().length === 0;

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
              onPress={this.addWorkout}
              title="Save"
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    saveWorkout: bindActionCreators(saveNewWorkout, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewWorkout);
