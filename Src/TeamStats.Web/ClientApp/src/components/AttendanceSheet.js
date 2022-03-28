import React, { Component } from "react";
import { Table } from "./reusableComponents";
import "./AttendanceSheet.css";
import { getPlayers } from "../store/actions/playerActions";
import { registerPlayersAttendance } from "../store/actions/attendanceActions";
import { connect } from "react-redux";
import { Button } from "@mui/material";

class AttendanceSheet extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedPlayers: [] };
  }

  componentDidUpdate = async (prevProps) => {
    const { globalTeam, teamsList } = this.props;

    if (prevProps.globalTeam !== globalTeam) {
      if (globalTeam === "none") {
        await this.props.getPlayers();
      } else {
        const teamId = teamsList.find((x) => x.name === globalTeam).id;
        await this.props.getPlayers(teamId);
      }
    }
  };

  handleSelectedPlayers = (selectedPlayer) => {
    const { selectedPlayers } = this.state;
    const player = selectedPlayers.indexOf(selectedPlayer) !== -1;
    const that = this;

    if (player) {
      const remainingPlayers = this.state.selectedPlayers.filter(
        (x) => x.name !== selectedPlayer.name
      );

      that.setState({ selectedPlayers: remainingPlayers });
    } else {
      that.setState({
        selectedPlayers: [...selectedPlayers, selectedPlayer],
      });
    }
  };

  handleSubmit = async () => {
    const { registerPlayersAttendance, globalDate } = this.props;
    const { selectedPlayers } = this.state;

    if (selectedPlayers.length !== 0) {
      const payload = {
        date: globalDate,
        players: selectedPlayers.map((x) => x.id),
      };
      console.log(payload);
      await registerPlayersAttendance(payload);
    }
  };

  render() {
    const { playersData, isPlayerLoading, isAttendanceLoading } = this.props;
    const { selectedPlayers } = this.state;
    const { handleSelectedPlayers, handleSubmit } = this;

    return (
      <>
        <div className="attendanceSheet">
          {isPlayerLoading ? (
            <p
              style={{
                height: "100%",
                width: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
              Loading...
            </p>
          ) : (
            <div>
              <Table
                headers={["Name"]}
                data={playersData}
                checkbox
                handleClick={handleSelectedPlayers}
                selectedPlayers={selectedPlayers}
              />
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            {isAttendanceLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playersData: state.players.playersData,
  isPlayerLoading: state.teams.isPlayerLoading,
  globalTeam: state.globalState.globalTeam,
  globalDate: state.globalState.globalDate,
  teamsList: state.teams.teamsList,
  isAttendanceLoading: state.attendance.isAttendanceLoading,
});

const mapDispatchToProps = { getPlayers, registerPlayersAttendance };

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceSheet);
