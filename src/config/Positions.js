const xPadding = 30;
const yPadding = 100;

const focusedXPadding = 500;

const gameSceneXPadding = -10;
const gameSceneYPadding = -80;

const defaultSize = 150;
const focusedSize = 350;

const width = 1920;
const height = 1080;


const spacedYCoords = (n) => {
  let ys = []
  for (let index = 0; index < n; index++) {
    const y = (height - yPadding * 2) / n * index + yPadding;
    ys.push(y);
  } 
  return ys;
}

const Positions = {
  DEFAULT_POSITIONS: [
    spacedYCoords(5).map(e=> ({top: e, left: xPadding})),
    spacedYCoords(5).map(e=> ({top: e, right: xPadding})),
  ],
  BENCH_PLAYER_SELECTED_POSITIONS: [
    spacedYCoords(4).map(e=> ({top: e, left: xPadding})),
    spacedYCoords(4).map(e=> ({top: e, right: xPadding})),
  ],
  FOCUSED_PLAYER_SELECTED_POSITIONS: [
    {width: focusedSize, height: focusedSize, top: height / 2 - focusedSize / 2,  left: focusedXPadding},
    {width: focusedSize, height: focusedSize, top: height / 2 - focusedSize / 2, right: focusedXPadding},
  ],
  BENCH_PLAYER_GAME_POSITIONS: [
    spacedYCoords(4).map(e=> ({top: e, left: -xPadding - defaultSize})),
    spacedYCoords(4).map(e=> ({top: e, right: -xPadding - defaultSize})),
  ],
  FOCUSED_PLAYER_GAME_POSITIONS: [
    {width: focusedSize, height: focusedSize, top: height - gameSceneYPadding - focusedSize,  left: gameSceneXPadding},
    {width: focusedSize, height: focusedSize, top: height - gameSceneYPadding - focusedSize,  right: gameSceneXPadding},
  ],
  ALL_HIDDEN_GAME_POSITIONS: [
    spacedYCoords(5).map(e=> ({top: e, left: -xPadding - defaultSize})),
    spacedYCoords(5).map(e=> ({top: e, right: -xPadding - defaultSize})),
  ]
}
export default Positions