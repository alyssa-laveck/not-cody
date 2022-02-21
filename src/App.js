import GameRow from './components/game-row.tsx';
import GameTile from './components/game-tile.tsx';
import './styles/App.css';

function App() {
  return (
    <>
      <div className="not-cody-class flex-center">
        WURDLE 3.0!
      </div>

      <GameRow />
    </>
  );
}

export default App;