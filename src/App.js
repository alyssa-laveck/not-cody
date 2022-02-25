import Game from './components/game.tsx';
import GameRow from './components/game-row.tsx';
import GameTile from './components/game-tile.tsx';
import './styles/App.css';

function App() {
    return (
        <div>
            <div className="game-title flex-center">WURDLE 3.0!</div>
            <Game />
        </div>
    );
}

export default App;
