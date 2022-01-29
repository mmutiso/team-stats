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

const styles = (theme) => ({
  paper: { width: "40vw", padding: 40 },
  form: { display: "flex", flexDirection: "column" },
  textFieldContainer: { marginBottom: 16 },
  textField: { width: "100%" },
});

class ClubRegistration extends Component {
  state = { managerName: "", email: "", phoneNumber: "", clubName: "" };

  handleSubmit = async () => {
    const { history, registerClub, data } = this.props;
    const { managerName, email, phoneNumber, clubName } = this.state;

    const payload = { managerName, email, phoneNumber, clubName };

    console.log(data);

    // history.push("/team-setup");
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, status, error } = this.props;
    const { handleSubmit, handleChange } = this;
    const { managerName, email, phoneNumber, clubName } = this.state;

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
          </div>
          <form className={classes.form}>
            <div className={classes.textFieldContainer}>
              <TextField
                color="primary"
                size="small"
                label="Name"
                name="managerName"
                value={managerName}
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
            <div className={classes.textFieldContainer}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Club Name"
                variant="outlined"
                name="clubName"
                value={clubName}
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
                status === "loading" ? (
                  <CircularProgress size={16} style={{ color: "#fff" }} />
                ) : (
                  <NextIcon />
                )
              }
              onClick={() => handleSubmit()}
              disabled={
                managerName === "" ||
                email === "" ||
                phoneNumber.length !== 10 ||
                clubName === ""
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

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ClubRegistration)));
