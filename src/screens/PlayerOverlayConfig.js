import { useEffect, useState } from "react"

const PlayerOverlayConfig = () => {

  const [playerData, setPlayerData] = useState([[{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}]]);
  const [selectedPlayerIndices, setSelectedPlayerIndices] = useState([-1, -1]);
  const [teamColors, setTeamColors] = useState(["", ""]);


  const [showPlayerBlurbs, setShowPlayerBlurbs] = useState({ 0: false, 1: false });

  const changePlayerName = (teamIndex, playerIndex, name) => {
    const newPlayers = [...playerData].map(e => [...e]);
    newPlayers[teamIndex][playerIndex] = {
      ...newPlayers[teamIndex][playerIndex],
      name,
    };
    setPlayerData(newPlayers);
  }

  const changePlayerBlurb = (teamIndex, playerIndex, blurb) => {
    const newPlayers = [...playerData].map(e => [...e]);
    newPlayers[teamIndex][playerIndex] = {
      ...newPlayers[teamIndex][playerIndex],
      blurb,
    };
    setPlayerData(newPlayers);
  }

  const eliminatePlayer = (teamIndex, playerIndex, eliminated) => {

    const newPlayers = [...playerData].map(e => [...e]);
    newPlayers[teamIndex][playerIndex] = {
      ...newPlayers[teamIndex][playerIndex],
      eliminated
    };
    setPlayerData(newPlayers);

  }

  const setSelectedPlayer = (teamIndex, playerIndex) => {

    const newSelectedPlayers = [...selectedPlayerIndices];
    newSelectedPlayers[teamIndex] = playerIndex;
    setSelectedPlayerIndices(newSelectedPlayers)

  }

  const createTeamColorInputOnChange = (teamIndex, color) => {
    const newTeamColors = [...teamColors];
    newTeamColors[teamIndex] = color;
    setTeamColors(newTeamColors)
  }

  const saveToLocalStorage = () => {
    window.localStorage.setItem('ctl-player-overlay-config', JSON.stringify({
      playerData,
      selectedPlayerIndices,
      teamColors
    }));
    console.log("saved");
  }

  const loadFromLocalStorage = () => {
    try {
      const {
        playerData: newPlayerData,
        selectedPlayerIndices: newSelectedPlayers,
        teamColors: newTeamColors
      } = JSON.parse(localStorage.getItem('ctl-player-overlay-config'));
      setPlayerData(playerData => newPlayerData ?? playerData);
      setSelectedPlayerIndices(selectedIndices => newSelectedPlayers ?? selectedIndices);
      setTeamColors(teamColors => newTeamColors ?? teamColors);
      console.log("successfully fetched from localstorage");
    } catch (e) {
      console.log('failed to fetch from localstorage');
    }
  }

  useEffect(loadFromLocalStorage, []);

  return (
    <div className="config-container">
      <div className="player-config">
        {playerData.map((players, teamIndex) =>
          <div className={`player-col player-col-team-${teamIndex + 1}`}>
            <h3>Team {teamIndex + 1}</h3>
            {players.map((player, playerIndex) =>
              <div className={`player-row player-row-team-${teamIndex + 1}`} key={`${playerIndex} ${teamIndex}`}>

                <input
                  type="checkbox" onChange={e => eliminatePlayer(teamIndex, playerIndex, e.target.checked)}
                  name={`team${teamIndex}`}
                  checked={player.eliminated ?? false}
                />
                <input
                  onChange={e => changePlayerName(teamIndex, playerIndex, e.target.value)}
                  value={player?.name ?? ""}
                  placeholder={`Team ${teamIndex + 1} Player ${playerIndex + 1} name`}
                  className="player-row-text-input"
                />
                <input
                  type="radio" onChange={e => setSelectedPlayer(teamIndex, playerIndex)}
                  name={`team${teamIndex}`}
                  checked={selectedPlayerIndices[teamIndex] === playerIndex}
                />
              </div>
            )}

            <button style={{
              marginTop: 5,
              marginBottom: 5,
            }} onClick={() => setSelectedPlayer(teamIndex, -1)}>Clear Selected Player</button>

            <button
              onClick={() => setShowPlayerBlurbs(showBlurbs => ({
                ...showBlurbs,
                [teamIndex]: !showBlurbs[teamIndex]
              }))}
            >{showPlayerBlurbs[teamIndex] ? "Hide" : "Show"} player blurbs</button>
            {showPlayerBlurbs[teamIndex] && players.map((player, playerIndex) =>
              <input
                onChange={e => changePlayerBlurb(teamIndex, playerIndex, e.target.value)}
                value={player?.blurb ?? ""}
                placeholder={`Team ${teamIndex + 1} Player ${playerIndex + 1} blurb`}
                className="player-row-text-input"
              />
            )}

            <span>Team Color Hex:</span>
            <input
              placeholder={`Team ${teamIndex + 1} Color Hex`}
              value={teamColors[teamIndex]}
              onChange={e => createTeamColorInputOnChange(teamIndex, e.target.value)}
            />
          </div>
        )}


      </div>
      <button className="save-button" onClick={saveToLocalStorage}>Save</button>
    </div>
  )
}


export default PlayerOverlayConfig;
