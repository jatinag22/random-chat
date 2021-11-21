import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import routes from '.';
import NavBar from '../components/NavBar';
import { useAppSelector } from '../redux/hooks';

type RenderComponentProps = {
  component: React.ComponentType,
  props: React.ComponentProps<any>
};

const Main = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  height: '100%',
  padding: theme.spacing(1),
  marginTop: theme.spacing(6),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: (open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '250px',
  }),
}));

const RenderComponent = ({ component: Component, props }: RenderComponentProps) => {
  const { isMenuDrawerOpen } = useAppSelector((state) => state.app);

  return (
    <Paper sx={{ borderRadius: 0, boxShadow: 'none', height: '100%' }}>
      <NavBar />
      <Main open={isMenuDrawerOpen} component="main">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </Main>
    </Paper>
  );
};

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
