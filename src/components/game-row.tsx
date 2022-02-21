import { FC } from 'react';
import GameTile from './game-tile.tsx';

const ROW_LENGTH = 5;

const GameRow: FC = () => {
    let gameTiles: GameTile = [];

    for (let i = 0; i < ROW_LENGTH; i++) {
        gameTiles.push(<GameTile letter="h" status="good"/>);
    }

    return (
        <div className="flex-center">
            { gameTiles }
        </div>
    )
};

export default GameRow;