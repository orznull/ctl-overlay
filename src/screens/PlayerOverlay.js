import { useState, useEffect } from 'react'
import PlayerIcon from '../components/PlayerIcon';
import Positions from '../config/Positions'
import { useInterval } from '../hooks/useInterval';

const PlayerOverlay = () => {
  const [playerData, setPlayerData] = useState([[{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}]]);
  const [selectedPlayerIndices, setSelectedPlayerIndices] = useState([-1, -1]);
  const [teamColors, setTeamColors] = useState(["", ""]);
  const [playerPositions, setPlayerPositions] = useState(Positions.DEFAULT_POSITIONS);
  const [scene, setScene] = useState("");

  var int = useInterval(() => {
    // there is no emitted event to send 
    if (window.obsstudio) {
      window.obsstudio.getCurrentScene(function (data) {
        if (data.name == "player-select") {
          transitionToPlayerSelectScene()
        } else if (data.name == "players-chosen") {
          console.log("wah");
          transitionToSelectedPlayerScene();
        } else if (data.name == "game-scene") {
          transitionToGameScene();
        } else {
          transitionPlayersOut();
        }
      });
    }
  }, 300);

  useEffect(() => {
    loadFromLocalStorage();

    const onStorage = () => {
      loadFromLocalStorage();
    }
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    }
  }, [])

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

  useEffect(() => {
    if (scene == "players-chosen") {
      console.log("bah");
      transitionToSelectedPlayerScene(true);
    } else if (scene == "game-scene") {
      transitionToGameScene(true);
    }
  }, [selectedPlayerIndices]);

  const transitionToSelectedPlayerScene = force => {
    if (scene == "players-chosen" && !force) {
      return;
    }
    setScene(scene => "players-chosen");
    const newPlayerPositions = [];
    for (var teamIndex = 0; teamIndex < playerData.length; teamIndex++) {
      if (selectedPlayerIndices[teamIndex] < 0 || selectedPlayerIndices[teamIndex] >= 5) {
        newPlayerPositions.push(Positions.DEFAULT_POSITIONS[teamIndex]);
        continue;
      }
      newPlayerPositions.push([]);
      var benchIndex = 0;
      for (var playerIndex = 0; playerIndex < playerData[teamIndex].length; playerIndex++) {
        if (playerIndex == selectedPlayerIndices[teamIndex]) {
          newPlayerPositions[teamIndex].push(Positions.FOCUSED_PLAYER_SELECTED_POSITIONS[teamIndex]);
        } else {
          newPlayerPositions[teamIndex].push(Positions.BENCH_PLAYER_SELECTED_POSITIONS[teamIndex][benchIndex]);
          benchIndex++;
        }
      }
    }
    setPlayerPositions(newPlayerPositions);
    console.log("transitioning to player chosen screen")
  }
  const transitionToPlayerSelectScene = e => {
    if (scene == "player-select") {
      return;
    }
    setScene(scene => "player-select");
    setPlayerPositions(Positions.DEFAULT_POSITIONS);
    console.log("transitioning to player select screen")
  }

  const transitionPlayersOut = () => {
    if (scene == "players-out") {
      return;
    }
    setScene(scene => "players-out");
    setPlayerPositions(Positions.ALL_HIDDEN_GAME_POSITIONS);
    console.log("transitioning players out")
  }

  const transitionToGameScene = force => {
    if (scene == "game-scene" && !force) {
      return;
    }
    setScene(scene => "game-scene");
    const newPlayerPositions = [];
    for (var teamIndex = 0; teamIndex < playerData.length; teamIndex++) {
      if (selectedPlayerIndices[teamIndex] < 0 || selectedPlayerIndices[teamIndex] >= 5) {
        newPlayerPositions.push(Positions.ALL_HIDDEN_GAME_POSITIONS[teamIndex]);
        continue;
      }
      newPlayerPositions.push([]);
      var benchIndex = 0;
      for (var playerIndex = 0; playerIndex < playerData[teamIndex].length; playerIndex++) {
        if (playerIndex == selectedPlayerIndices[teamIndex]) {
          newPlayerPositions[teamIndex].push(Positions.FOCUSED_PLAYER_GAME_POSITIONS[teamIndex]);
        } else {
          newPlayerPositions[teamIndex].push(Positions.BENCH_PLAYER_GAME_POSITIONS[teamIndex][benchIndex]);
          benchIndex++;
        }
      }
    }

    console.log('transitioning to game scene');
    setPlayerPositions(newPlayerPositions);
  }

  return (
    <div>
      <main>
        {playerData.map((team, teamIndex) =>
          team.map((player, playerIndex) =>
            <PlayerIcon
              teamColor={teamColors[teamIndex]}
              username={player.name}

              pos={playerPositions[teamIndex][playerIndex]}
              selected={selectedPlayerIndices[teamIndex] == playerIndex && scene == "players-chosen"}
              eliminated={player.eliminated}
              blurb={player.blurb}
            />
          )
        )}
      </main>
      {/* Testing buttons that should be off screen. */}
      <button onClick={transitionToPlayerSelectScene}>player select scene</button>
      <button onClick={transitionToSelectedPlayerScene}>player chosen scene</button>
      <button onClick={transitionToGameScene}>game scene</button>
    </div>
  )
}

export default PlayerOverlay;
