import { FC, useEffect, useState, useCallback } from 'react';
import GameRow from './game-row.tsx';

// type GameProps = {
// };

const Game: FC = () => {
    const [input, setInput] = useState('');

    const ROW_COUNT = 6;
    const WORD_LENGTH = 5;

    useEffect(() => {
        const onKeyDown = ({ key, keyCode }) => {
            // console.log(key);
            if (key === 'Backspace' && input.length > 0) {
                setInput(input.slice(0, input.length - 1));
            } else if (input.length < WORD_LENGTH) {
                if (keyCode >= 65 && keyCode <= 90) {
                    setInput(input + key.toUpperCase());
                }
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [input, setInput, WORD_LENGTH]);

    const renderRows = (count) => {
        let rows = [];

        for (let i = 0; i < count; i++) {
            rows.push(<GameRow key={i} />);
        }

        return rows;
    };

    console.log(input);

    return <div className="flex-center column">{renderRows(ROW_COUNT)}</div>;
};

export default Game;
