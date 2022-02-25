import Game from './components/game.tsx';
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
