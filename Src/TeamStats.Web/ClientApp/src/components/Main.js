import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Tracker from "./Tracker";
import Stats from "./Stats";

const styles = (theme) => ({
  paper: {
    padding: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #E0E0E0",
    marginBottom: 16,
  },
});

class Main extends Component {
  state = { teamName: "senior", date: new Date() };

  handleTeamChange = (value) => {
    this.setState({ teamName: value });
  };
  handleDateChange = (value) => {
    this.setState({ date: value });
  };
  render() {
    const { classes, tabName, selectedIndex } = this.props;
    const { handleTeamChange, handleDateChange } = this;
    const { teamName, date } = this.state;

    const HorizontalBar = (
      <Grid container>
        <Grid item md={8} style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            style={{ fontStyle: "italic", fontWeight: 600 }}
          >
            {tabName}
          </Typography>
        </Grid>
        <Grid item md={4} style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "40%", marginLeft: 16 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="team-select-label">Select team</InputLabel>
              <Select
                labelId="team-select-label"
                id="team-select"
                value={teamName}
                label="Select team"
                onChange={(e) => handleTeamChange(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
                <MenuItem value="u21">U21</MenuItem>
                <MenuItem value="u10">U10</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    );

    return (
      <>
        <Paper elevation={0} className={classes.paper}>
          {HorizontalBar}
        </Paper>
        {selectedIndex === 0 ? <Stats /> : <Tracker />}
      </>
    );
  }
}

export default withStyles(styles)(Main);
