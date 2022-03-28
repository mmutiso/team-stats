import React, { Component } from "react";
import { Table } from "./reusableComponents";
import "./AttendanceAnalytics.css";
import { connect } from "react-redux";
import { getPlayersAttendance } from "../store/actions/attendanceActions";

class AttendanceAnalytics extends Component {
  componentDidMount = async () => {
    const { getPlayersAttendance, globalTeam, teamsList } = this.props;

    if (globalTeam !== "none") {
      const teamId = teamsList.find((x) => x.name === globalTeam).id;

      await getPlayersAttendance(teamId);
    }
  };

  componentDidUpdate = async (prevProps) => {
    const { globalTeam, teamsList } = this.props;

    if (prevProps.globalTeam != globalTeam) {
      if (globalTeam === "none") {
        await this.props.getPlayersAttendance();
      } else {
        const teamId = teamsList.find((x) => x.name === globalTeam).id;
        await this.props.getPlayersAttendance(teamId);
      }
    }
  };

  handleSelectedPlayer = (selectedPlayer) => {
    console.log(selectedPlayer);
  };

  render() {
    const { handleSelectedPlayer } = this;

    const rows = [
      { id: "player1", name: "Player 1", count: 10 },
      { id: "player2", name: "Player 2", count: 13 },
      { id: "player3", name: "Player 3", count: 24 },
      { id: "player4", name: "Player 4", count: 7 },
      { id: "player5", name: "Player 5", count: 15 },
      { id: "player6", name: "Player 6", count: 5 },
      { id: "player7", name: "Player 7", count: 9 },
      { id: "player8", name: "Player 8", count: 30 },
      { id: "player9", name: "Player 9", count: 25 },
      { id: "player10", name: "Player 10", count: 25 },
    ];

    return (
      <div className="attendanceAnalytics">
        <Table
          headers={["Name", "Attendances"]}
          data={rows}
          handleClick={handleSelectedPlayer}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  playersData: state.teams.playersData,
  globalTeam: state.globalState.globalTeam,
  teamsList: state.teams.teamsList,
});

const mapDispatchToProps = { getPlayersAttendance };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceAnalytics);
