import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import routes from '.';
import NavBar from '../components/NavBar';

type RenderComponentProps = {
  component: React.ComponentType,
  props: React.ComponentProps<any>
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  marginTop: theme.spacing(6),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '250px',
  }),
}));

const RenderComponent = ({ component: Component, props }: RenderComponentProps) => (
  <>
    <NavBar />
    <Main open>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </Main>
  </>
);

const AppRoutes = () => (
  <Switch>
    {routes.map(({ path, component, exact }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={(props) => <RenderComponent component={component} props={props} />}
      />
    ))}
  </Switch>
);

export default AppRoutes;
