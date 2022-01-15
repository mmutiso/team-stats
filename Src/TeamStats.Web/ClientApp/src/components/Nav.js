import React, { Component } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({ appBar: { background: "#fff" } });

export class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="fixed" classes={{ root: classes.appBar }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              style={{
                fontWeight: 600,
                fontStyle: "italic",
                cursor: "pointer",
                "&:hover": { color: "#EDF0EF" },
              }}
            >
              Team Stats
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Nav);
