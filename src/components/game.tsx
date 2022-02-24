import { FC, useEffect, useState } from 'react';
import GameRow from './game-row.tsx';

// type GameProps = {
// };

const isValidWord = (word) => {
    if (word.length < 5) {
        return false;
    }

    // Need something to check if valid english word and add check here

    return true;
}

const Game: FC = () => {
    const [input, setInput] = useState('');
    const [currentRow, setRow] = useState(0);

    const ROW_COUNT = 6;
    const WORD_LENGTH = 5;

    useEffect(() => {
        const onKeyDown = ({ key, keyCode }) => {
            if (key === 'Backspace' && input.length > 0) {
                setInput(input.slice(0, input.length - 1));
            }

            if (key === 'Enter' && isValidWord(input)) {
                if (currentRow < ROW_COUNT - 1) {
                    setRow(currentRow + 1);
                }
            }

            if (keyCode >= 65 && keyCode <= 90 && input.length < WORD_LENGTH) {
                setInput(input + key.toUpperCase());
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [input, setInput, WORD_LENGTH, currentRow]);

    const renderRows = (count, currentRow) => {
        let rows = [];

        for (let i = 0; i < count; i++) {
            rows.push(<GameRow key={i} isInputRow={i === currentRow} input={input} />);
        }

        return rows;
    };

    console.log(input);

    return (
        <div className="flex-center column">
            {renderRows(ROW_COUNT, currentRow)}
        </div>
    );
};

export default Game;