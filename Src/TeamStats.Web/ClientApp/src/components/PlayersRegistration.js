import TextField from "@mui/material/TextField";
import React, { Component } from "react";
import withStyles from "@mui/styles/withStyles";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { getTeams } from "../store/actions/teamActions";
import { registerPlayers } from "../store/actions/playerActions";

const styles = () => ({
  container: {},
  //   textField: { marginBottom: 8 },
  textFieldContainer: {
    display: "flex",
    marginTop: 8,
    marginBottom: 24,
  },
  textField: {
    [`& fieldset`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      // borderLeftWidth: 0.5,
    },
  },
  formControl: {
    [`& fieldset`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      // borderRightWidth: 0.5,
    },
  },
});

export class PlayersRegistration extends Component {
  state = { teamName: "senior" };

  componentDidMount = async () => {
    const clubId = localStorage.getItem("clubId");

    await this.props.getTeams(clubId);
  };

  render() {
    const {
      classes,
      teamsList,
      handlePlayerAddition,
      handleChange,
      player,
      players,
      handleTeamChange,
      selectedTeam,
      handleKeyDown,
    } = this.props;
    const { teamName } = this.state;

    return (
      <div className={classes.container}>
        <Typography variant="overline">
          Enter a player's name and hit add
        </Typography>
        <div className={classes.textFieldContainer}>
          <div
            style={{
              width: "20%",
            }}
          >
            <FormControl fullWidth size="small" className={classes.formControl}>
              <InputLabel id="team-select-label">Select team</InputLabel>
              <Select
                labelId="team-select-label"
                id="team-select"
                value={selectedTeam}
                label="Select team"
                onChange={(e) => handleTeamChange(e.target.value)}
              >
                <MenuItem value="none">None</MenuItem>
                {teamsList?.map((x) => (
                  <MenuItem key={x.id} value={x.name}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <TextField
            size="small"
            label="Player Name"
            value={player}
            name="player"
            onChange={(e) => handleChange(e)}
            variant="outlined"
            style={{ width: "60%" }}
            className={classes.textField}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Button
            startIcon={<AddIcon size="small" />}
            style={{ flexGrow: 1, marginLeft: 8 }}
            onClick={() => handlePlayerAddition()}
          >
            Add
          </Button>
        </div>
        <List style={{ maxHeight: "30vh" }}>
          {players.map((x, i) => (
            <ListItem
              key={i}
              button
              secondaryAction={
                <IconButton size="small">
                  <CloseIcon style={{ fontSize: 18 }} />
                </IconButton>
              }
            >
              <ListItemText>{x}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teamsList: state.teams.teamsList,
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, { getTeams, registerPlayers })(PlayersRegistration)
);
