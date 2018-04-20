import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import AppWithNavigationState from './src/navigation/rootNavigation';
import reducers, { AppState } from './src/redux';

const navMiddleware = createReactNavigationReduxMiddleware('root', (state: AppState) => state.nav);

export const addListener = createReduxBoundAddListener('root');

export default class App extends React.Component {
  render() {
    // @ts-ignore
    const store = createStore(reducers, {}, applyMiddleware(navMiddleware));
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppWithNavigationState />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
