import { FC, useEffect, useState } from 'react';
import { ROW_COUNT, WORD_LENGTH } from '../constants';
import { TileStatus } from "../components/game-tile";
import { TileState } from '../types/tile-state';
import GameRow from './game-row';

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
    const [currentRow, setCurrentRow] = useState<number>(0);

    useEffect(() => {
        const keyDown = ({ key, keyCode }: any) => {
            if (key === 'Backspace' && input.length > 0) {
                setInput(input.slice(0, input.length - 1));
            } else if (keyCode >= 65 && keyCode <= 90 && input.length < WORD_LENGTH) {
                setInput([...input, key.toUpperCase()]);
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

    const renderRows = (currentRow: number) => {
        let rows = [];

        for (let i = 0; i < ROW_COUNT; i++) {
            let rowInput: string[] = [];

            if (i < guesses.length) {
                rowInput = guesses[i];
            } else if (i === currentRow) {
                rowInput = input;
            }

            const tempRowInput = rowInput.map(letter => {
                return {
                    letter,
                    status: TileStatus.Blank
                } as TileState
            });

            rows.push(<GameRow key={i} row={tempRowInput} />);
        }

        return rows;
    };

    return <div className="flex-center column">{renderRows(currentRow)}</div>;
};

export default Game;
