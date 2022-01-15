import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import withStyles from "@mui/styles/withStyles";
import Nav from "./Nav";
import SidePane from "./SidePane";
import Main from "./Main";

const styles = () => ({
  container: { paddingTop: 40, paddingLeft: 40, paddingRight: 40 },
});

class Home extends Component {
  state = { selectedIndex: 1, tabName: "Team Sheet" };

  handleActiveTab = (e, tabName, index) => {
    console.log(tabName);
    this.setState({ selectedIndex: index, tabName: tabName });
  };

  render() {
    const { classes } = this.props;
    const { handleActiveTab } = this;
    const { selectedIndex, tabName } = this.state;

    return (
      <div>
        <Nav />
        <Toolbar />
        <Grid container spacing={2} className={classes.container}>
          <Grid item md={2} sm={2}>
            <SidePane
              handleActiveTab={handleActiveTab}
              selectedIndex={selectedIndex}
            />
          </Grid>
          <Grid item md={10} sm={10}>
            <Main tabName={tabName} selectedIndex={selectedIndex}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
