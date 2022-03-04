import { FC } from 'react';
import { WORD_LENGTH } from '../constants.ts';
import GameTile from './game-tile.tsx';

type GameRowProps = {
    input: string[];
};

const GameRow: FC<GameRowProps> = ({ input }) => {
    let gameTiles: GameTile = [];

    for (let i = 0; i < WORD_LENGTH; i++) {
        gameTiles.push(<GameTile key={i} letter={input[i]} status="good" />);
    }

    return <div className="flex-center">{gameTiles}</div>;
};

export default GameRow;
