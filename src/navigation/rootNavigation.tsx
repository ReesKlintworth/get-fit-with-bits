import React from 'react';
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationScreenProp,
} from 'react-navigation';
import { connect } from 'react-redux';
import { AppState, Dispatch } from '../redux';
import Home from '../components/Home';
import { AppRoutes } from './routes';
import { addListener } from '../../App';
import EditWorkout from '../components/EditWorkout';
import Camera from '../components/Camera';

export interface NavigationProps {
  navigation: NavigationScreenProp<any>;
}

export const RootStackNavigator = StackNavigator(
  {
    [AppRoutes.Main]: {
      screen: Home,
    },
    [AppRoutes.EditWorkout]: {
      screen: EditWorkout,
    },
    [AppRoutes.Camera]: {
      screen: Camera,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
    initialRouteName: AppRoutes.Main,
  }
);

const AppWithNavigationState = ({
  dispatch,
  nav,
}: {
  dispatch: Dispatch;
  nav: any;
}) => (
  <RootStackNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav, addListener })}
  />
);

const mapStateToProps = (state: AppState) => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
