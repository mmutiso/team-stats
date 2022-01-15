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

const styles = () => ({
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

  handleTeamChange = (value) => {
    this.setState({ teamName: value });
  };

  render() {
    const { classes } = this.props;
    const { teamName } = this.state;
    const { handleTeamChange } = this;

    return (
      <div>
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
                value={teamName}
                label="Select team"
                onChange={(e) => handleTeamChange(e.target.value)}
              >
                <MenuItem value="senior">Senior</MenuItem>
                <MenuItem value="u21">U21</MenuItem>
                <MenuItem value="u10">U10</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            size="small"
            label="Player Name"
            variant="outlined"
            style={{ width: "60%" }}
            className={classes.textField}
          />
          <Button
            startIcon={<AddIcon size="small" />}
            style={{ flexGrow: 1, marginLeft: 8 }}
          >
            Add
          </Button>
        </div>
        <List>
          <ListItem
            button
            secondaryAction={
              <IconButton size="small">
                <CloseIcon style={{ fontSize: 18 }} />
              </IconButton>
            }
          >
            <ListItemText>Team 1</ListItemText>
          </ListItem>
          <ListItem
            button
            secondaryAction={
              <IconButton size="small">
                <CloseIcon style={{ fontSize: 18 }} />
              </IconButton>
            }
          >
            <ListItemText>Team 1</ListItemText>
          </ListItem>

          <ListItem
            button
            secondaryAction={
              <IconButton size="small">
                <CloseIcon style={{ fontSize: 18 }} />
              </IconButton>
            }
          >
            <ListItemText>Team 1</ListItemText>
          </ListItem>
          <ListItem
            button
            secondaryAction={
              <IconButton size="small">
                <CloseIcon style={{ fontSize: 18 }} />
              </IconButton>
            }
          >
            <ListItemText>Team 1</ListItemText>
          </ListItem>
          <ListItem
            button
            secondaryAction={
              <IconButton size="small">
                <CloseIcon style={{ fontSize: 18 }} />
              </IconButton>
            }
          >
            <ListItemText>Team 1</ListItemText>
          </ListItem>
          <ListItem
            button
            secondaryAction={
              <IconButton size="small">
                <CloseIcon style={{ fontSize: 18 }} />
              </IconButton>
            }
          >
            <ListItemText>Team 1</ListItemText>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(PlayersRegistration);
