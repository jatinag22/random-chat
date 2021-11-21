import HomePage from '../pages';
import { HOME, LOGIN } from './paths';

const routes = [
  {
    path: HOME,
    component: HomePage,
    exact: true,
  },
  {
    path: LOGIN,
    component: HomePage,
    exact: true,
  },
];

export default routes;
