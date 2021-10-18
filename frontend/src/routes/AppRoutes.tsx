import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '.';
import NavBar from '../components/NavBar';

type RenderComponentProps = {
  component: React.ComponentType,
  props: React.ComponentProps<any>
};

const RenderComponent = ({ component: Component, props }: RenderComponentProps) => (
  <>
    <NavBar />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...props} />
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
