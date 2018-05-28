import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  BackHandler,
} from 'react-native';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import AppWithNavigationState from './src/navigation/rootNavigation';
import reducers, { AppState, Dispatch } from './src/redux';
import storage from 'redux-persist/lib/storage';
import { NavigationActions, NavigationState } from 'react-navigation';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state: AppState) => state.nav
);

export const addListener = createReduxBoundAddListener('root');

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['nav'],
};

const configureStore = () => {
  // @ts-ignore
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store2 = createStore(
    persistedReducer,
    {},
    applyMiddleware(navMiddleware, thunk)
  );
  const persistor2 = persistStore(store2);
  // persistor2.purge();
  return {
    store: store2,
    persistor: persistor2,
  };
};

const { store, persistor } = configureStore();

interface Props {
  nav: NavigationState;
  dispatch: Dispatch;
}

class App extends React.Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppWithNavigationState />
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const nav = state.nav;
  return { nav };
};

const Index = connect(mapStateToProps)(App);

export default (AppContainer = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
