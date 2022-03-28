import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { withRouter } from "react-router";
import { registerClub } from "../store/actions/clubActions";
import { connect } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";

const styles = (theme) => ({
  paper: { width: "40vw", padding: 40 },
  form: { display: "flex", flexDirection: "column" },
  textFieldContainer: { marginBottom: 16 },
  textField: { width: "100%" },
});

class ClubRegistration extends Component {
  state = { clubName: "" };

  handleSubmit = async () => {
    const { history, registerClub, data } = this.props;
    const { clubName } = this.state;

    const payload = { clubName };

    console.log(data);

    // history.push("/team-setup");
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, status, error, handleChange, clubName } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Typography variant="overline" style={{ marginTop: 8 }}>
            Enter your club's name
          </Typography>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { registerClub })(
  withRouter(withStyles(styles)(ClubRegistration))
);
