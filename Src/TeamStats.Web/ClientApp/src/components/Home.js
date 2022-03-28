import React, { Component } from "react";
import Hidden from "@mui/material/Hidden";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { connect } from "react-redux";
import AttendanceSheet from "./AttendanceSheet";
import AttendanceAnalytics from "./AttendanceAnalytics";
import { getTeams } from "../store/actions/teamActions";
import { getPlayers } from "../store/actions/playerActions";
import {
  setGlobalTeam,
  setGlobalDate,
} from "../store/actions/globalStateActions";
import { gray, iconColor } from "../theme";
import { MdAssignmentTurnedIn, MdAnalytics } from "react-icons/md";
import "./Home.css";

class Home extends Component {
  state = { selectedIndex: 1, tabName: "Sheet" };

  componentDidMount = async () => {
    const clubId = localStorage.getItem("clubId");

    await this.props.getTeams(clubId);
    await this.props.getPlayers();
  };

  handleActiveTab = (e, tabName, index) => {
    this.setState({ selectedIndex: index, tabName: tabName });
  };

  handleTeamChange = (value) => {
    const { setGlobalTeam } = this.props;
    setGlobalTeam(value);
  };

  handleDateChange = (value) => {
    const { setGlobalDate } = this.props;
    setGlobalDate(value.toISOString());
  };

  render() {
    const { teamsList, globalDate, globalTeam } = this.props;
    const { handleTeamChange, handleDateChange, handleActiveTab } = this;
    const { selectedIndex, tabName } = this.state;

    return (
      <div className="home">
        <Hidden smDown>
          <div className="homeSidePane">
            <div className="sidePaneContainer">
              <div className="sidePaneLogo">
                <p className="sidePaneLogoText">Team Stats</p>
              </div>
              <div
                className={
                  selectedIndex === 0 ? "sidePaneItemSelected" : "sidePaneItem"
                }
                onClick={(e) => handleActiveTab(e, "Analytics", 0)}
              >
                <MdAnalytics
                  size={24}
                  color={selectedIndex === 0 ? "#fff" : iconColor}
                  className="sidePaneIcon"
                />
                <p className="sidePaneText">Analytics</p>
              </div>
              <div
                className={
                  selectedIndex === 1 ? "sidePaneItemSelected" : "sidePaneItem"
                }
                onClick={(e) => handleActiveTab(e, "Sheet", 1)}
              >
                <MdAssignmentTurnedIn
                  size={24}
                  color={selectedIndex === 1 ? "#fff" : iconColor}
                  className="sidePaneIcon"
                />
                <p className="sidePaneText">Sheet</p>
              </div>
            </div>
          </div>
        </Hidden>
        <div className="homeMain">
          <div className="main">
            <div className="mainHorizontalBar">
              <p className="mainHorizontalBarText">{tabName}</p>

              <div className="mainHorizontalBarSelectors">
                <div style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date"
                      inputFormat="MM/dd/yyyy"
                      value={globalDate}
                      onChange={(value) => handleDateChange(value)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div style={{ width: "40%", marginLeft: 16 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="team-select-label">Select team</InputLabel>
                    <Select
                      labelId="team-select-label"
                      id="team-select"
                      value={globalTeam}
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
              </div>
            </div>
            <div className="mainBottom">
              {selectedIndex === 0 ? (
                <AttendanceAnalytics />
              ) : (
                <AttendanceSheet />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teamsList: state.teams.teamsList,
  globalDate: state.globalState.globalDate,
  globalTeam: state.globalState.globalTeam,
});

const mapDispatchToProps = {
  getTeams,
  getPlayers,
  setGlobalTeam,
  setGlobalDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
