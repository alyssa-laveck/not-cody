import { FC } from 'react';
import GameTile from './game-tile.tsx';

const ROW_LENGTH = 5;

interface GameRowProps {
    letters: string[];
}

const GameRow: FC<GameRowProps> = ({ letters }) => {
    let gameTiles: GameTile = [];

    for (let i = 0; i < ROW_LENGTH; i++) {
        console.log(letters);
        gameTiles.push(<GameTile key={i} letter={letters[i]} />);
    }

    return <div className="flex-center">{gameTiles}</div>;
};

export default GameRow;
