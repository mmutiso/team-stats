import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { withRouter } from "react-router";

import { connect } from "react-redux";
import { loginUser } from "../store/actions/userActions";

const styles = (theme) => ({
  paper: { width: "40vw", padding: 40 },
  form: { display: "flex", flexDirection: "column" },
  textFieldContainer: { marginBottom: 16 },
  textField: { width: "100%" },
});

class UserLogin extends Component {
  state = {
    name: "Francis Mutiso",
  };

  handleSubmit = async () => {
    const { loginUser } = this.props;
    const { name } = this.state;

    const payload = { name };

    await loginUser(payload);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, userLoginError, isUserLoginLoading, userLoginData } =
      this.props;
    const { handleSubmit, handleChange } = this;
    const { name } = this.state;

    // const confirmationMsg = userLoginData.length !== 0 && userLoginData;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "16vh",
        }}
      >
        <Paper className={classes.paper}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Typography
              variant="h5"
              style={{ fontWeight: 700, textTransform: "uppercase" }}
            >
              Login
            </Typography>
            <Typography variant="overline" style={{ marginTop: 8 }}>
              Kindly enter your full name to login.
            </Typography>
            {/* {confirmationMsg && (
              <div style={{ marginTop: 8 }}>
                <Typography variant="caption" color="primary">
                  {confirmationMsg}
                </Typography>
              </div>
            )} */}

            {/* {userLoginError.length !== 0 && (
              <div style={{ marginTop: 8 }}>
                <Typography variant="caption" style={{ color: "#F4504E" }}>
                  User Login not successful. Try again!
                </Typography>
              </div>
            )} */}
          </div>
          <form className={classes.form}>
            <div className={classes.textFieldContainer}>
              <TextField
                color="primary"
                size="small"
                label="Full Name"
                name="name"
                value={name}
                variant="outlined"
                type="text"
                fullWidth
                onChange={(e) => handleChange(e)}
              />
            </div>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 16,
            }}
          >
            <Button
              variant="contained"
              size="small"
              endIcon={
                isUserLoginLoading ? (
                  <CircularProgress size={16} style={{ color: "#fff" }} />
                ) : (
                  <NextIcon />
                )
              }
              onClick={() => handleSubmit()}
              disabled={name === ""}
            >
              Login
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoginData: state.users.userLoginData,
    isUserLoginLoading: state.users.isUserLoginLoading,
    userLoginError: state.users.userLoginError,
  };
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, { loginUser })(UserLogin))
);
