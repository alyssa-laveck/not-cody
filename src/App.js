import GameTile from './components/game-tile.tsx';
import './styles/App.css';

function App() {
  return (
    <>
      <div className="not-cody-class">Not Cody</div>
      <div className="tile-container">
        <div className="tile-row">
          <GameTile letter="W" status="good" />
          <GameTile letter="A" status="used" />
          <GameTile letter="S" status="unused" />
        </div>
      </div>
    </>
  );
}

export default App;
