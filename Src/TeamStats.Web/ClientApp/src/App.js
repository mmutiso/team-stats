import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import UserRegistration from "./components/UserRegistration";
import TeamSetup from "./components/TeamSetup";

export default class App extends React.Component {
  state = { name: "", email: "", phoneNumber: "" };

  handleRegistrationChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { handleRegistrationChange } = this;
    const { name, email, phoneNumber } = this.state;

    return (
      <div style={{}}>
        <Switch>
          <Route path="/register-user">
            <UserRegistration
              handleChange={handleRegistrationChange}
              name={name}
              email={email}
              phoneNumber={phoneNumber}
            />
          </Route>
          <Route path="/register-club">
            <TeamSetup name={name} email={email} phoneNumber={phoneNumber} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}
