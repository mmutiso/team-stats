import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import withStyles from "@mui/styles/withStyles";
import { List, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import RecordIcon from "@mui/icons-material/Addchart";
import StatsIcon from "@mui/icons-material/Insights";
const styles = (theme) => ({
  paper: {
    height: "80vh",
    border: "1px solid #E0E0E0",
  },
});

class SidePane extends Component {
  render() {
    const { classes, selectedIndex, handleActiveTab } = this.props;

    return (
      <Paper elevation={0} className={classes.paper}>
        <List>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(e) => handleActiveTab(e, "Attendance", 0)}
          >
            <ListItemIcon>
              <StatsIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(e) => this.props.handleActiveTab(e, "Team Sheet", 1)}
          >
            <ListItemIcon>
              <RecordIcon />
            </ListItemIcon>
            <ListItemText primary="Team Sheet" />
          </ListItemButton>
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(SidePane);
