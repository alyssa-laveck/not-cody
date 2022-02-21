import { FC } from 'react';
import GameRow from './game-row.tsx';

// type GameProps = {
// };

const Game: FC = () => {
    const ROW_COUNT = 6;

    const renderRows = (count) => {
        let rows = [];
        for(let i=0; i < count; i++) {
            rows.push(<GameRow key={i} />)
        }
        return rows;
    };


    return (
    <div className="flex-center column">
        { renderRows(ROW_COUNT) }
    </div>
    );
};

export default Game;