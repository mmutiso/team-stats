import React from "react";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import withStyles from "@mui/styles/withStyles";
import TeamsRegistration from "./TeamsRegistration";
import PlayersRegistration from "./PlayersRegistration";
import ClubRegistration from "./ClubRegistration";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextIcon from "@mui/icons-material/ArrowForward";
import { CircularProgress, Divider } from "@mui/material";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { registerClub } from "../store/actions/clubActions";
import { registerTeams } from "../store/actions/teamActions";
import { registerPlayers } from "../store/actions/playerActions";

const styles = (theme) => ({
  paper: { width: "42vw", padding: 40, minHeight: "80vh" },
});

class TeamSetup extends React.Component {
  state = {
    activeStep: 0,
    player: "",
    players: [],
    team: "",
    teams: [],
    clubName: "",
    selectedTeam: "",
  };

  handleNext = async () => {
    const { activeStep, clubName, teams, players, selectedTeam } = this.state;
    const {
      history,
      name,
      email,
      phoneNumber,
      registerClub,
      registerTeams,
      registerPlayers,
      teamData,
    } = this.props;

    localStorage.removeItem("clubId");
    if (activeStep === 0) {
      const payload = { managerName: name, email, phoneNumber, clubName };

      await registerClub(payload);

      if (this.props.clubLoadingError.length === 0) {
        let clubId = this.props.clubData.clubId;

        localStorage.setItem("clubId", clubId);
        this.setState({ activeStep: 1 });
      }
    } else if (activeStep === 1) {
      let clubId = localStorage.getItem("clubId");
      const payload = { clubId, teams: teams };
      await registerTeams(payload);

      if (this.props.teamLoadingError.length === 0) {
        this.setState({ activeStep: 2 });
      }
    } else {
      const teamId = teamData.find((team) => team.name === selectedTeam).id;
      const payload = { teamId, names: players };

      await registerPlayers(payload);

      if (this.props.playerLoadingError === 0) {
        history.push("/");
      }
    }
  };

  handleClubNameChange = (e) => {
    this.setState({ clubName: e.target.value });
  };

  handleTeamChange = (value) => {
    this.setState({ selectedTeam: value });
  };

  handlePlayerAddition = () => {
    const { player, players } = this.state;
    const { handlePlayerClear } = this;

    if (player.length !== 0) {
      this.setState(
        { players: [...players, player] } /*() =>
        handlePlayerClear()*/
      );
    }
  };

  handleTeamAddition = () => {
    const { team, teams } = this.state;
    const { handleTeamClear } = this;

    if (team.length !== 0) {
      this.setState({ teams: [...teams, team] } /*() => handleTeamClear()*/);
    }
  };

  handleTextFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePlayerClear = () => {
    this.setState({ player: "" });
  };

  handleTeamClear = () => {
    this.setState({ teams: "" });
  };

  render() {
    const {
      classes,
      name,
      email,
      phoneNumber,
      isClubLoading,
      isTeamLoading,
      isPlayerLoading,
    } = this.props;
    const { activeStep, clubName, team, player, teams, players, selectedTeam } =
      this.state;
    const {
      handleNext,
      handleClubNameChange,
      handleTeamAddition,
      handlePlayerAddition,
      handleTextFieldChange,
      handleTeamChange,
    } = this;

    const steps = [
      {
        label: "Club Name",
        component: (
          <ClubRegistration
            handleChange={handleClubNameChange}
            clubName={clubName}
          />
        ),
      },
      {
        label: "Teams",
        component: (
          <TeamsRegistration
            handleTeamAddition={handleTeamAddition}
            handleChange={handleTextFieldChange}
            team={team}
            teams={teams}
          />
        ),
      },
      {
        label: "Players",
        component: (
          <PlayersRegistration
            handlePlayerAddition={handlePlayerAddition}
            handleChange={handleTextFieldChange}
            handleTeamChange={handleTeamChange}
            selectedTeam={selectedTeam}
            player={player}
            players={players}
          />
        ),
      },
    ];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "12vh",
          // marginBottom: "5vh",
          maxHeight: "40vh",
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
            {activeStep === 0
              ? steps[0].component
              : activeStep === 1
              ? steps[1].component
              : steps[2].component}
          </div>
          <div style={{ marginTop: "auto" }}>
            <Divider />
            <div style={{ marginTop: 16, display: "flex" }}>
              <Button
                endIcon={
                  isClubLoading || isTeamLoading || isPlayerLoading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : (
                    <NextIcon />
                  )
                }
                style={{ marginLeft: "auto" }}
                size="small"
                onClick={() => handleNext()}
                disabled={clubName.length === 0}
              >
                {activeStep <= 1 ? "Next" : "Submit"}
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isClubLoading: state.clubs.isClubLoading,
  clubLoadingError: state.clubs.clubLoadingError,
  clubData: state.clubs.clubData,
  teamData: state.teams.teamData,
  isPlayerLoading: state.players.isPlayerLoading,
  isTeamLoading: state.teams.isTeamLoading,
  teamLoadingError: state.teams.teamLoadingError,
  playerLoadingError: state.players.playerLoadingError,
});

const mapDispatchToProps = {
  registerClub,
  registerTeams,
  registerPlayers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(TeamSetup)));
