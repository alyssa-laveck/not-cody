import GameRow from './components/game-row.tsx';
import GameTile from './components/game-tile.tsx';
import './styles/App.css';

function App() {
  return (
    <>
      <div className="not-cody-class flex-center">
        Not Cody
      </div>

      <GameRow />

      <div className="tile-container flex-center">
        <div className="flex-center">
          <GameTile letter="W" status="good" />
          <GameTile letter="A" status="used" />
          <GameTile letter="S" status="unused" />
        </div>
      </div>
    </>
  );
}

export default App;