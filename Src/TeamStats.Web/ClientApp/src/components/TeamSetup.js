import React from "react";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import withStyles from "@mui/styles/withStyles";
import TeamsRegistration from "./TeamsRegistration";
import PlayersRegistration from "./PlayersRegistration";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/ArrowBack";
import NextIcon from "@mui/icons-material/ArrowForward";
import { Divider } from "@mui/material";
import { withRouter } from "react-router";

const styles = (theme) => ({
  paper: { width: "42vw", padding: 40, minHeight: "80vh" },
});

const steps = [
  { label: "Teams", component: <TeamsRegistration /> },
  { label: "Players", component: <PlayersRegistration /> },
];

class TeamSetup extends React.Component {
  state = { activeStep: 0 };

  handleActiveStep = () => {};

  handleBack = () => {
    this.setState({ activeStep: 0 });
  };

  handleNext = () => {
    const { activeStep } = this.state;
    const { history } = this.props;

    if (activeStep === 0) {
      this.setState({ activeStep: 1 });
    } else {
      history.push("/");
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const { handleBack, handleNext } = this;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "16vh",
          marginBottom: "5vh",
        }}
      >
        <Paper className={classes.paper}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 30,
              textTransform: "uppercase",
            }}
          >
            <Typography variant="h6">Team Registration</Typography>
          </div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((x, index) => (
              <Step key={index}>
                <StepLabel>{x.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div style={{ marginTop: 20 }}>
            {activeStep === 0 ? steps[0].component : steps[1].component}
          </div>
          <Divider />
          <div style={{ marginTop: 16, display: "flex" }}>
            {activeStep === 1 && (
              <Button
                onClick={() => handleBack()}
                size="small"
                startIcon={<BackIcon />}
              >
                Back
              </Button>
            )}

            <Button
              endIcon={<NextIcon />}
              style={{ marginLeft: "auto" }}
              size="small"
              onClick={() => handleNext()}
            >
              {activeStep === 0 ? "Next" : "Submit"}
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(TeamSetup));
