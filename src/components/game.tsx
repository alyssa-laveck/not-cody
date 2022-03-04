import { FC, useEffect, useState } from 'react';
import { ROW_COUNT, WORD_LENGTH } from '../constants.ts';
import GameRow from './game-row.tsx';

const isValidWord = (word: string[]): boolean => {
    if (word.length < 5) {
        return false;
    }

    // Need something to check if valid english word and add check here

    return true;
};

const Game: FC = () => {
    const [guesses, setGuesses] = useState<string[][]>([]);
    const [input, setInput] = useState<string[]>([]);
    const [currentRow, setCurrentRow] = useState(0);

    useEffect(() => {
        const keyDown = ({ key, keyCode }) => {
            if (key === 'Backspace' && input.length > 0) {
                setInput(input.slice(0, input.length - 1));
            } else if (keyCode >= 65 && keyCode <= 90 && input.length < WORD_LENGTH) {
                setInput(input + key.toUpperCase());
            } else if (key === 'Enter' && isValidWord(input)) {
                if (currentRow < ROW_COUNT - 1) {
                    setCurrentRow(currentRow + 1);
                    setGuesses([...guesses, [...input]]);
                    setInput([]);
                }
            }
        };

        window.addEventListener('keydown', keyDown);

        return () => {
            window.removeEventListener('keydown', keyDown);
        };
    }, [input, currentRow, guesses]);

    const renderRows = (count, currentRow) => {
        let rows = [];

        for (let i = 0; i < count; i++) {
            let rowInput = [];

            if (i < guesses.length) {
                rowInput = guesses[i];
            } else if (i === currentRow) {
                rowInput = input;
            }

            rows.push(<GameRow key={i} input={rowInput} />);
        }

        return rows;
    };

    return <div className="flex-center column">{renderRows(ROW_COUNT, currentRow)}</div>;
};

export default Game;
