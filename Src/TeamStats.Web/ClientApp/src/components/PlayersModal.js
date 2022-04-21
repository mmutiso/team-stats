import React, { useState } from "react";

// material ui components
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import makeStyles from "@mui/styles/makeStyles";

// custom components
import PlayersRegistration from "./PlayersRegistration";
import Button from "./reusableComponents/Button";

const useStyles = makeStyles({ dialogContent: { height: "60vh" } });

function PlayersModal({ open, handleClose }) {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");

  const addPlayerToArray = () => {
    if (player.length !== 0) {
      setPlayers([...players, player]);
      setPlayer("")
    }
  };

  const removePlayerFromArray = (x) => {
    const remainingPlayers = players.filter((player) => player !== x);
    setPlayers(remainingPlayers);
  };

  const onKeyDown = (e) => {
    if (e.which === 13) {
      addPlayerToArray();
    }
  };

  const handleChange = (e) => {
    setPlayer(e.target.value);
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Add Player</DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <PlayersRegistration
            players={players}
            player={player}
            handleChange={handleChange}
            handleKeyDown={onKeyDown}
            handlePlayerAddition={addPlayerToArray}
            handleRemovePlayer={removePlayerFromArray}
          />
        </DialogContent>
        <DialogActions>
          <Button label='Cancel' onClick={handleClose} />
          <Button label='Save' />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PlayersModal;
