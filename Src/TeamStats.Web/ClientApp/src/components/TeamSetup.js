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
import { registerTeams, getTeams } from "../store/actions/teamActions";
import { registerPlayers } from "../store/actions/playerActions";

const styles = (theme) => ({
  paper: {
    width: "42vw",
    padding: 40,
    minHeight: "80vh",
    position: "relative",
  },
});

class TeamSetup extends React.Component {
  state = {
    activeStep: 0,
    player: "",
    players: [],
    team: "",
    teams: [],
    clubName: "",
    selectedTeam: "none",
  };

  componentDidMount = async () => {
    const clubId = localStorage.getItem("clubId");

    if (clubId) {
      this.setState({ activeStep: 1 });
    }

    await this.props.getTeams(clubId);

    if (this.props.teamsList.length !== 0) {
      this.setState({ activeStep: 2 });
    }
  };

  handleRemoveTeam = (x) => {
    const remainingTeams = this.state.teams.filter((team) => team !== x);
    this.setState({ teams: remainingTeams });
  };

  handleRemovePlayer = (x) => {
    const remainingPlayers = this.state.players.filter(
      (player) => player !== x
    );
    this.setState({ players: remainingPlayers });
  };

  handleNext = async () => {
    const { activeStep, clubName, teams, players, selectedTeam } = this.state;
    const { history, registerClub, registerTeams, registerPlayers, teamsList } =
      this.props;

    if (activeStep === 0) {
      const payload = { clubName };
      localStorage.removeItem("clubId");
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

      if (this.props.teamsRegistrationError.length === 0) {
        this.setState({ activeStep: 2 });
      }
    } else {
      const teamId = teamsList.find((team) => team.name === selectedTeam).id;
      const payload = { teamId, names: players };

      await registerPlayers(payload);

      if (this.props.playerLoadingError.length === 0) {
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
      this.setState({ players: [...players, player] }, () =>
        handlePlayerClear()
      );
    }
  };

  handleTeamAddition = () => {
    const { team, teams } = this.state;
    const { handleTeamClear } = this;

    if (team.length !== 0) {
      this.setState({ teams: [...teams, team] }, () => handleTeamClear());
    }
  };

  handleKeyDown = (e) => {
    const { activeStep } = this.state;
    const { handleTeamAddition, handlePlayerAddition } = this;

    if (e.which === 13 && activeStep === 1) {
      handleTeamAddition();
    } else if (e.which === 13 && activeStep === 2) {
      handlePlayerAddition();
    } else {
      return;
    }
  };

  handleTextFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePlayerClear = () => {
    this.setState({ player: "" });
  };

  handleTeamClear = () => {
    this.setState({ team: "" });
  };

  render() {
    const {
      classes,
      isClubLoading,
      isTeamsRegistrationLoading,
      isPlayerLoading,
    } = this.props;
    const { activeStep, clubName, team, player, teams, players, selectedTeam } =
      this.state;
    const {
      handleNext,
      handleClubNameChange,
      handleTeamAddition,
      handleKeyDown,
      handlePlayerAddition,
      handleTextFieldChange,
      handleTeamChange,
      handleRemoveTeam,
      handleRemovePlayer,
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
            handleKeyDown={handleKeyDown}
            handleChange={handleTextFieldChange}
            handleRemoveTeam={handleRemoveTeam}
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
            handleKeyDown={handleKeyDown}
            handleChange={handleTextFieldChange}
            handleTeamChange={handleTeamChange}
            selectedTeam={selectedTeam}
            player={player}
            players={players}
            handleRemovePlayer={handleRemovePlayer}
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
          maxHeight: "50vh",
        }}
      >
        <Paper className={classes.paper}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 24,
              textTransform: "uppercase",
            }}
          >
            <Typography variant="subtitle1">
              Club Registration Details
            </Typography>
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
          <div
            style={{ position: "absolute", bottom: 5, width: "100%", left: 0 }}
          >
            <Divider />
            <div style={{ marginTop: 8, display: "flex" }}>
              <Button
                endIcon={
                  isClubLoading ||
                  isTeamsRegistrationLoading ||
                  isPlayerLoading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : (
                    <NextIcon />
                  )
                }
                style={{ marginLeft: "auto", marginRight: 32 }}
                size="small"
                onClick={() => handleNext()}
                disabled={
                  activeStep === 0
                    ? clubName.length === 0
                    : activeStep === 1
                    ? teams.length === 0
                    : players.length === 0
                }
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
  teamRegistrationResponse: state.teams.teamRegistrationResponse,
  isPlayerLoading: state.players.isPlayerLoading,
  isTeamsRegistrationLoading: state.teams.isTeamsRegistrationLoading,
  teamsRegistrationError: state.teams.teamsRegistrationError,
  playerLoadingError: state.players.playerLoadingError,
  teamsList: state.teams.teamsList,
});

const mapDispatchToProps = {
  registerClub,
  registerTeams,
  registerPlayers,
  getTeams,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(TeamSetup)));
