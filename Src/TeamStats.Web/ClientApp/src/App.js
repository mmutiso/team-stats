import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import ClubRegistration from "./components/ClubRegistration";
import TeamSetup from "./components/TeamSetup";

export default function App() {
  return (
    <div style={{}}>
      <Switch>
        <Route path="/register">
          <ClubRegistration />
        </Route>
        <Route path="/team-setup">
          <TeamSetup />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
