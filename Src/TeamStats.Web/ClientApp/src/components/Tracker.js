import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import withStyles from "@mui/styles/withStyles";
import Paper from "@mui/material/Paper";

const styles = (theme) => ({
  paper: {
    // border: "1px solid #E0E0E0",
    marginBottom: 16,
    marginTop: 16,
    height: "70vh",
    overflowY: "auto",
  },
});

class AttendanceTracker extends Component {
  render() {
    const { classes } = this.props;

    const columns = [
      { id: "name", name: "Name" },
      { id: "count", name: "Attendance Count" },
    ];

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
    ];

    return (
      <Paper className={classes.paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
              // align="right"
              // style={{ minWidth: column.minWidth }}
              >
                Player's Name
              </TableCell>
              <TableCell
              // align="right"
              // style={{ minWidth: column.minWidth }}
              >
                Attendance Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(AttendanceTracker);
