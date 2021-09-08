import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../store/auth";

export const PrivateRoute = ({ component: Component, ...rest }:any) => {
  const { currentUser }:any = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/auth" />
      }}
    />
  );
};