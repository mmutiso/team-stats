import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import { withRouter } from "react-router";

const styles = (theme) => ({
  paper: { width: "40vw", padding: 40 },
  form: { display: "flex", flexDirection: "column" },
  textFieldContainer: { marginBottom: 16 },
  textField: { width: "100%" },
});

class ManagerRegistration extends Component {
  handleSubmit = () => {
    const { history } = this.props;
    history.push("/team-setup");
  };

  render() {
    const { classes } = this.props;
    const { handleSubmit } = this;

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
                variant="outlined"
                type="text"
                className={classes.textField}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                color="primary"
                size="small"
                label="Email"
                variant="outlined"
                type="email"
                className={classes.textField}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                type="phone"
                className={classes.textField}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Club Name"
                variant="outlined"
                type="text"
                className={classes.textField}
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
            >
              Submit
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ManagerRegistration));
