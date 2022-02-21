import Game from './components/game.tsx';
import GameRow from './components/game-row.tsx';
import GameTile from './components/game-tile.tsx';
import './styles/App.css';

function App() {
    return (
        <>
            <div className="game-title flex-center">WURDLE 3.0!</div>
            <Game />

            {/* <div className="tile-container flex-center">
        <div className="flex-center">
          <GameTile letter="W" status="good" />
          <GameTile letter="A" status="used" />
          <GameTile letter="S" status="unused" />
        </div>
      </div> */}
        </>
    );
}

export default App;
