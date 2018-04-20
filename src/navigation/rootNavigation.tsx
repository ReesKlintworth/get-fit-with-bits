import React from 'react';
import { StackNavigator, addNavigationHelpers, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState, Dispatch } from '../redux';
import Thing from '../components/Thing';
import { AppRoutes } from './routes';
import { addListener } from '../../App';

export interface NavigationProps {
  navigation: NavigationScreenProp<any>;
}

export const RootStackNavigator = StackNavigator(
  {
    [AppRoutes.Main]: {
      screen: Thing,
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
