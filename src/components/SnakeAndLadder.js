import { useEffect, useState } from "react";

const generateRandomNumber = (range = 100) => Math.ceil(Math.random() * range);

function randomBoxGenerator(noOfLadders, extraSetToCompareTo = []) {
  const entities = [];

  const showTopBefore = extraSetToCompareTo.length > 0;

  let i = 0;

  while (i < noOfLadders) {
    const number1 = generateRandomNumber();
    let number2 = generateRandomNumber();
    while (number1 === number2) {
      number2 = generateRandomNumber();
    }
    const compareEntities = [...entities, ...extraSetToCompareTo];
    const currentItem = (showTopBefore ? number2 > number1 : number1 > number2)
      ? [number2, number1]
      : [number1, number2];
    const [currFrom, currTo] = currentItem;
    let add = true;
    compareEntities.some((entity) => {
      const [from, to] = entity;
      if (
        currFrom === from ||
        currTo === to ||
        currTo === from ||
        currFrom === to
      ) {
        add = false;
        return true;
      }
      return false;
    });
    if (!add) continue;
    else {
      entities.push(currentItem);
      i++;
    }
  }
  return entities;
}

const SnakeAndLadder = (props) => {
  const { noOfPlayers, noOfLadders, noOfSnakes } = props;
  const [snakes, setSnakes] = useState([]);
  const [ladders, setLadders] = useState([]);
  const [playersInfo, setPlayersInfo] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setPlayersInfo(
      Array(noOfPlayers)
        .fill()
        .map((_, index) => ({ playerId: index + 1, position: 0 }))
    );
    const ladds = randomBoxGenerator(noOfLadders);
    setLadders(ladds);
    const snaks = randomBoxGenerator(noOfSnakes, ladds);
    setSnakes(snaks);
  }, []);

  const handleRollDice = () => {
    const rollValue = generateRandomNumber(6);
    setValue(rollValue);
    const currPlayerPos = playersInfo.find(
      (player) => player.playerId === currentPlayer
    ).position;
    let updatedPos = currPlayerPos + rollValue;
    if (updatedPos > 100) {
      return;
    }
    const hasJumped = ladders.some((ladder) => {
      const [from, to] = ladder;
      if (from === updatedPos) {
        updatedPos = to;
        alert("Jumping to " + to);
        return true;
      }
      return false;
    });
    if (!hasJumped) {
      snakes.some((snake) => {
        const [from, to] = snake;
        if (from === updatedPos) {
          updatedPos = to;
          alert("Bitten to " + to);
          return true;
        }
        return false;
      });
    }
    if (updatedPos === 100) {
      alert(`${currentPlayer} won`);
    }
    setPlayersInfo(
      playersInfo.map((player) => {
        const playerId = player.playerId;
        if (currentPlayer === playerId) {
          return { playerId, position: updatedPos };
        } else {
          return player;
        }
      })
    );

    if (rollValue !== 6) {
      setCurrentPlayer(currentPlayer + 1 > noOfPlayers ? 1 : currentPlayer + 1);
    }
  };

  console.log(snakes, ladders);

  return (
    <div className="container">
      <button onClick={handleRollDice} className="rollDice">
        Roll Dice
      </button>
      Previous turn: {value}
      {playersInfo.map((player) => {
        return (
          <div className="player">
            Player {player.playerId} {player.position}
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        Snake Position:{" "}
        {snakes.map((item) => (
          <div>
            {item[0]} -> {item[1]}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        Ladder Position:{" "}
        {ladders.map((item) => (
          <div>
            {item[0]} -> {item[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnakeAndLadder;
