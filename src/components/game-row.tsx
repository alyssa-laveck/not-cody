import { FC } from 'react';
import { WORD_LENGTH } from '../constants.ts';
import { TileStatus } from './game-tile.tsx';
import { TileState } from '../types/tile-state.ts';
import GameTile from './game-tile.tsx';

type GameRowProps = {
    row: TileState[];
};

const GameRow: FC<GameRowProps> = ({ row }) => {
    let gameTiles: GameTile = [];

    for (let i = 0; i < row.length; i++) {
        gameTiles.push(<GameTile key={i} letter={row[i].letter} status={row[i].status} />);
    }

    for (let i = gameTiles.length; i < WORD_LENGTH; i++) {
        gameTiles.push(<GameTile key={i} letter="" status={TileStatus.Blank} />);
    }

    return <div className="flex-center">{gameTiles}</div>;
};

export default GameRow;
