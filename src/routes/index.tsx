import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import Users from "../pages/Users";
import Cards from "../pages/Cards";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/users" exact component={Users} isPrivate />
    <Route path="/cards" exact component={Cards} isPrivate />
  </Switch>
);

export default Routes;
