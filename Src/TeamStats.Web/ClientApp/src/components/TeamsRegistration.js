import React, { Component } from "react";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import withStyles from "@mui/styles/withStyles";
import AddIcon from "@mui/icons-material/Add";

const styles = (theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  textFieldContainer: {
    display: "flex",
    marginTop: 8,
    marginBottom: 24,
  },
});

class TeamsRegistration extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="overline">
          How many teams do you have in your club?
        </Typography>
        <div className={classes.textFieldContainer}>
          <TextField
            size="small"
            label="Team Name"
            variant="outlined"
            placeholder="eg. Senior, U21, U16"
            style={{ width: "80%" }}
          />
          <Button
            startIcon={<AddIcon size="small" />}
            style={{ flexGrow: 1, marginLeft: 8 }}
          >
            Add
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}></div>
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

export default withStyles(styles)(TeamsRegistration);
