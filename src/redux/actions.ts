import { NavigationActions } from 'react-navigation';
import { AppRoutes } from '../navigation/routes';

export const newWorkout = () =>
  NavigationActions.navigate({
    routeName: AppRoutes.NewWorkout,
  });
