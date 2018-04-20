import { RootStackNavigator } from '../navigation/rootNavigation';
import { AppRoutes } from '../navigation/routes';
import { NavigationActions } from 'react-navigation';
import { AnyAction } from 'redux';

const router = RootStackNavigator.router;

const initialNavState = router.getStateForAction(
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: AppRoutes.Main,
      }),
    ],
  })
);

const navReducer = (state = initialNavState, action: AnyAction) => {
  return router.getStateForAction(action, state) || state;
};

export default navReducer;
