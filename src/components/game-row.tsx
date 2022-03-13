import { FC } from 'react';
import { WORD_LENGTH } from '../constants';
import GameTile, { TileStatus } from './game-tile';
import { TileState } from '../types/tile-state';

type GameRowProps = {
    row: TileState[];
};

const GameRow: FC<GameRowProps> = ({ row }) => {
    let gameTiles: React.ReactElement[] = [];

    for (let i = 0; i < row.length; i++) {
        gameTiles.push(<GameTile key={i} letter={row[i].letter} status={row[i].status} />);
    }

    for (let i = gameTiles.length; i < WORD_LENGTH; i++) {
        gameTiles.push(<GameTile key={i} letter="" status={TileStatus.Blank} />);
    }

    return <div className="flex-center">{gameTiles}</div>;
};

export default GameRow;
