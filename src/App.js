import SnakeAndLadder from "./components/SnakeAndLadder";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <SnakeAndLadder noOfPlayers={5} noOfLadders={10} noOfSnakes={10} />
    </div>
  );
}
