import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";

const styles = () => ({
  paper: {
    height: "67.5vh",
    border: "1px solid #E0E0E0",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 7,
    },

    "&::-webkit-scrollbar-track": {
      borderRadius: 999,
      backgroundColor: "#e0e0e0",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#606060",
      borderRadius: 999,
    },
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

class AttendanceSheet extends Component {
  render() {
    const { classes } = this.props;

    const PLAYERS = [
      { id: 1, name: "Player 1" },
      { id: 2, name: "Player 2" },
      { id: 3, name: "Player 3" },
      { id: 4, name: "Player 4" },
      { id: 5, name: "Player 5" },
      { id: 6, name: "Player 6" },
      { id: 7, name: "Player 7" },
      { id: 8, name: "Player 8" },
      { id: 9, name: "Player 9" },
      { id: 10, name: "Player 10" },
    ];

    return (
      <Paper elevation={0} className={classes.paper}>
        <List component="nav" dense>
          {PLAYERS.map((x) => (
            <ListItem
              key={x.id}
              // button
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => {}}
                  // checked={}
                />
              }
            >
              <ListItemButton>
                <ListItemText>{x.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(AttendanceSheet);
