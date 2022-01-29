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
import { axiosInstance } from "../axiosInstance";
import { registerUser } from "../store/actions/userActions";

const styles = (theme) => ({
  paper: { width: "40vw", padding: 40 },
  form: { display: "flex", flexDirection: "column" },
  textFieldContainer: { marginBottom: 16 },
  textField: { width: "100%" },
});

class UserRegistration extends Component {
  state = { name: "", email: "", phoneNumber: "" };

  handleSubmit = async () => {
    const { history, registerUser, name, email, phoneNumber, handleChange } =
      this.props;
    // const { name, email, phoneNumber } = this.state;

    const payload = { name, email, phoneNumber };

    await registerUser(payload);
    if (this.props.userLoadingError.length === 0) {
      history.push("/register-club");
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      classes,
      userLoadingError,
      isUserLoading,
      userData,
      name,
      email,
      phoneNumber,
      handleChange,
    } = this.props;
    const { handleSubmit /*handleChange*/ } = this;
    // const { name, email, phoneNumber } = this.state;

    const confirmationMsg = userData.length !== 0 && userData;

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
              Register
            </Typography>
            <Typography variant="overline" style={{ marginTop: 8 }}>
              Kindly enter the following details to get started.
            </Typography>
            {confirmationMsg && (
              <div style={{ marginTop: 8 }}>
                <Typography variant="caption" color="primary">
                  {confirmationMsg}
                </Typography>
              </div>
            )}

            {userLoadingError.length !== 0 && (
              <div style={{ marginTop: 8 }}>
                <Typography variant="caption" style={{ color: "#F4504E" }}>
                  User Registration not successful. Try again!
                </Typography>
              </div>
            )}
          </div>
          <form className={classes.form}>
            <div className={classes.textFieldContainer}>
              <TextField
                color="primary"
                size="small"
                label="Name"
                name="name"
                value={name}
                variant="outlined"
                type="text"
                fullWidth
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                color="primary"
                size="small"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                type="email"
                fullWidth
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                type="phone"
                name="phoneNumber"
                value={phoneNumber}
                fullWidth
                onChange={(e) => handleChange(e)}
                placeholder="eg. 0712345678"
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
                isUserLoading ? (
                  <CircularProgress size={16} style={{ color: "#fff" }} />
                ) : (
                  <NextIcon />
                )
              }
              onClick={() => handleSubmit()}
              disabled={
                name === "" || email === "" || phoneNumber.length !== 10
              }
            >
              Submit
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    isUserLoading: state.users.isUserLoading,
    userLoadingError: state.users.userLoadingError,
  };
};

export default withRouter(
  withStyles(styles)(
    connect(mapStateToProps, { registerUser })(UserRegistration)
  )
);
