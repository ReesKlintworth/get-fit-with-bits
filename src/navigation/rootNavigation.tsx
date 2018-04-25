import React from 'react';
import { StackNavigator, addNavigationHelpers, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState, Dispatch } from '../redux';
import Home from '../components/Home';
import { AppRoutes } from './routes';
import { addListener } from '../../App';
import NewWorkout from '../components/NewWorkout';

export interface NavigationProps {
  navigation: NavigationScreenProp<any>;
}

export const RootStackNavigator = StackNavigator(
  {
    [AppRoutes.Main]: {
      screen: Home,
    },
    [AppRoutes.NewWorkout]: {
      screen: NewWorkout,
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

const AppWithNavigationState = ({ dispatch, nav }: { dispatch: Dispatch; nav: any }) => (
  <RootStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />
);

const mapStateToProps = (state: AppState) => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
