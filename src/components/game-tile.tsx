import { FC } from 'react';
import { TileStatus } from '../constants.ts';

type TileProps = {
    letter?: string;
    status: TileStatus;
};

const GameTile: FC<TileProps> = ({ letter, status = TileStatus.Blank }) => {
    return (
        <div className={`flex-center game-tile ${status}`}>
            {letter && letter.toUpperCase()}
        </div>
    );
};

export default GameTile;