import HomePage from '../pages';
import ChatPage from '../pages/chat';
import { HOME, CHAT } from './paths';

const routes = [
  {
    path: HOME,
    component: HomePage,
    exact: true,
  },
  {
    path: CHAT,
    component: ChatPage,
    exact: true,
  },
];

export default routes;
