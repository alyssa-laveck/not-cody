import { FC, useEffect, useState } from 'react';
import { ROW_COUNT, WORD_LENGTH } from '../constants';
import { TileStatus } from "../components/game-tile";
import { TileState } from '../types/tile-state';
import GameRow from './game-row';


const CORRECT_WORD = 'CRANE';
const CORRECT_LETTERS = CORRECT_WORD.split('');

const isValidWord = (word: string[]): boolean => {
    if (word.length < 5) {
        return false;
    }

    // Need something to check if valid english word and add check here

    return true;
};

const Game: FC = () => {
    const [guesses, setGuesses] = useState<TileState[][]>([]);
    const [input, setInput] = useState<string[]>([]);
    const [currentRow, setCurrentRow] = useState<number>(0);

    useEffect(() => {
        const keyDown = ({ key, keyCode }: any) => {
            if (key === 'Backspace' && input.length > 0) {
                setInput(input.slice(0, input.length - 1));
            } else if (keyCode >= 65 && keyCode <= 90 && input.length < WORD_LENGTH) {
                setInput([...input, key.toUpperCase()]);
            } else if (key === 'Enter' && isValidWord(input)) {
                if (currentRow < ROW_COUNT) {
                    setCurrentRow(currentRow + 1);
                    setGuesses([...guesses, guessWord(input)]);
                    setInput([]);
                }
            }
        };

        window.addEventListener('keydown', keyDown);

        return () => {
            window.removeEventListener('keydown', keyDown);
        };
    }, [input, currentRow, guesses]);

    const guessWord = (letters: string[]): TileState[] => {
        const tiles: TileState[] = letters.map((letter: string, idx: number): TileState => {
            const tileState: TileState = {
                letter,
                status: TileStatus.None
            };

            if (CORRECT_LETTERS.includes(letter)) {
                if (CORRECT_LETTERS[idx] !== letter) {
                    tileState.status = TileStatus.Used;
                } else {
                    tileState.status = TileStatus.Good;
                }
            }

            return tileState;
        });

        return tiles;
    }

    const renderRows = (currentRow: number) => {
        let rows = [];

        for (let i = 0; i < ROW_COUNT; i++) {
            let rowInput: TileState[] = [];

            if (i < guesses.length) {
                rowInput = guesses[i];
            } else if (i === currentRow) {
                rowInput = input.map(letter => {
                    return {
                        letter,
                        status: TileStatus.Blank
                    } as TileState
                });
            }

            rows.push(<GameRow key={i} row={rowInput} />);
        }

        return rows;
    };

    return <div className="flex-center column">{renderRows(currentRow)}</div>;
};

export default Game;
