export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    true === false
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

