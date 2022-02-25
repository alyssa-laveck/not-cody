import { FC } from 'react';
import GameTile from './game-tile.tsx';

const ROW_LENGTH = 5;

type GameRowProps = {
    input: string[];
};

const GameRow: FC<GameRowProps> = ({ input }) => {
    let gameTiles: GameTile = [];

    for (let i = 0; i < ROW_LENGTH; i++) {
        gameTiles.push(<GameTile key={i} letter={input[i]} status="good" />);
    }

    return <div className="flex-center">{gameTiles}</div>;
};

export default GameRow;
