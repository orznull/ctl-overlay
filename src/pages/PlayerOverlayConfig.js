import { useEffect, useState } from "react"

const PlayerOverlayConfig = () => {

  const [players, setPlayers] = useState([["","","","",""],["","","","",""]]);
  const [selectedPlayerIndices, setSelectedPlayerIndices] = useState([-1,-1]);
  const [teamColors, setTeamColors] = useState(["", ""]);

  const createUsernameInputOnChange = (teamIndex, playerIndex) => {
    return e => {
      const newPlayers = [...players].map(e => [...e]);
      newPlayers[teamIndex][playerIndex] = e.target.value;
      setPlayers(newPlayers);
    }
  }

  const createSelectPlayerInputOnChange = (teamIndex, playerIndex) => {
    return e => {
      const newSelectedPlayers = [...selectedPlayerIndices];
      newSelectedPlayers[teamIndex] = playerIndex;
      setSelectedPlayerIndices(newSelectedPlayers)
    }
  }

  const createTeamColorInputOnChange = (teamIndex) => {
    return e => {
      const newTeamColors = [...teamColors];
      newTeamColors[teamIndex] = e.target.value;
      setTeamColors(newTeamColors)
    }
  }

  const saveToLocalStorage = () => {
    window.localStorage.setItem('ctl-player-overlay-config',JSON.stringify({
      players,
      selectedPlayerIndices,
      teamColors
    }))
  }

  const loadFromLocalStorage = () => {
    try {
      const {
        players: newPlayers,
        selectedPlayerIndices: newSelectedPlayers,
        teamColors: newTeamColors}= JSON.parse(localStorage.getItem('ctl-player-overlay-config'));
      setPlayers([...newPlayers]);
      setSelectedPlayerIndices([...newSelectedPlayers]);
      setTeamColors([...newTeamColors]);
      console.log("successfully fetched from localstorage");
    } catch(e) {
      console.log('failed to fetch from localstorage');
    }
  }

  useEffect(loadFromLocalStorage, []);

  return (
    <div className="config-container">
      <div className="player-config">
        {[0,1].map(teamIndex => 
          <div className={`player-col player-col-team-${teamIndex+1}`}>
            <strong>Team {teamIndex+1}</strong>
            {[0,1,2,3,4].map(playerIndex => 
              <div className = {`player-row player-row-team-${teamIndex+1}`}>
              <input
                onChange={createUsernameInputOnChange(teamIndex, playerIndex)}
                value={players[teamIndex][playerIndex]}
                placeholder = {`Team ${teamIndex+1} Player ${playerIndex+1} name`}
                className="username-input"
              />
              <input
                type="radio" onChange={createSelectPlayerInputOnChange(teamIndex, playerIndex)}
                name={`team${teamIndex}`}
                checked={selectedPlayerIndices[teamIndex] == playerIndex}
              />
              </div>
            )}
            <button onClick={createSelectPlayerInputOnChange(teamIndex, -1)}>Clear Selected Player</button>
            <span>Team Color Hex:</span>
            <input
              placeholder={`Team ${teamIndex+1} Color Hex`}
              value={teamColors[teamIndex]}
              onChange={createTeamColorInputOnChange(teamIndex)}
            />
          </div>
        )}
        
        
      </div>
      <button className="save-button" onClick={saveToLocalStorage}>Save</button>
    </div>
  )
}


export default PlayerOverlayConfig;
