import React, { Component } from "react";
import "./EmailConfirmation.css";
import { Button } from "./reusableComponents";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { confirmUserRegistration } from "../store/actions/userActions";
import { red } from "../theme";

class EmailConfirmation extends Component {
  handleClick = async () => {
    const { history, location, confirmUserRegistration } = this.props;
    const email = new URLSearchParams(location.search).get("Email");
    const token = new URLSearchParams(location.search).get("Token");

    if (email && token) {
      await confirmUserRegistration({ email, token });
    }

    if (this.props.userConfirmationError.length === 0) {
      history.push("/register-club");
    }
  };

  render() {
    const { handleClick } = this;
    const { isUserConfirmationLoading, userConfirmationError } = this.props;

    return (
      <div className='emailConfirmation'>
        <div className='emailConfirmationContainer'>
          {userConfirmationError?.length > 0 && (
            <p
              className='emailConfirmationText emailConfirmationError'
              style={{ color: red }}
            >
              {userConfirmationError}
            </p>
          )}
          <p className='emailConfirmationText'>Confirm Registration?</p>
          <Button
            loading={isUserConfirmationLoading}
            label={isUserConfirmationLoading ? "Confirming..." : "Confirm"}
            onClick={() => handleClick()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isUserConfirmationLoading: state.users.isUserConfirmationLoading,
  userConfirmationError: state.users.userConfirmationError,
  userConfirmationData: state.users.userConfirmationData,
});

export default connect(mapStateToProps, { confirmUserRegistration })(
  withRouter(EmailConfirmation)
);
