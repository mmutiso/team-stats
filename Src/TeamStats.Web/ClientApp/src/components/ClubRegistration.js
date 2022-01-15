import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import { withRouter } from "react-router";

import { axiosInstance } from "../axiosInstance";

const styles = (theme) => ({
  paper: { width: "40vw", padding: 40 },
  form: { display: "flex", flexDirection: "column" },
  textFieldContainer: { marginBottom: 16 },
  textField: { width: "100%" },
});

class ClubRegistration extends Component {
  state = { name: "", email: "", phone: "", clubName: "" };

  handleSubmit = () => {
    const { history } = this.props;
    const { name, email, phone, clubName } = this.state;

    const payload = { name, email, phone, clubName };

    axiosInstance
      .get("/club", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // history.push("/team-setup");
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    console.log(e.target.value);
  };

  render() {
    const { classes } = this.props;
    const { handleSubmit, handleChange } = this;
    const { name, email, phone, clubName } = this.state;

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
                name="phone"
                value={phone}
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
              endIcon={<NextIcon />}
              onClick={() => handleSubmit()}
              disabled={
                name === "" ||
                email === "" ||
                phone.length !== 10 ||
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

export default withRouter(withStyles(styles)(ClubRegistration));
