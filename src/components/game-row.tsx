import { FC } from 'react';
import GameTile from './game-tile.tsx';

const ROW_LENGTH = 5;

type GameRowProps = {
    isInputRow: boolean;
    input: string[];
};

const GameRow: FC<GameRowProps> = ({ isInputRow, input }) => {
    let gameTiles: GameTile = [];
    let inputWord = isInputRow ? input : [];

    for (let i = 0; i < ROW_LENGTH; i++) {
        gameTiles.push(<GameTile key={i} letter={inputWord[i]} status="good" />);
    }

    return <div className="flex-center">{gameTiles}</div>;
};

export default GameRow;
