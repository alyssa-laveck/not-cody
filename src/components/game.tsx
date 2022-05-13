import { FC, useEffect, useState } from 'react';
import { ROW_COUNT, WORD_LENGTH } from '../constants';
import { TileStatus } from '../components/game-tile';
import { TileState } from '../types/tile-state';
import GameRow from './game-row';
import EndGame from './end-game';
import { VALID_WORD_LIST, ANSWER_LIST } from '../word-lists';

interface WordHash {
    [letter: string]: number;
}

const idx = Math.floor(Math.random() * ANSWER_LIST.length);
const CORRECT_WORD = ANSWER_LIST[idx];
const GUESSABLE_WORDS = VALID_WORD_LIST.concat(ANSWER_LIST);

//console.log(CORRECT_WORD);

const CORRECT_LETTERS = CORRECT_WORD.split('');

const CORRECT_WORD_HASH = CORRECT_LETTERS.reduce((acc: WordHash, letter: string): WordHash => {
    acc[letter] ? acc[letter]++ : (acc[letter] = 1);

    return acc;
}, {} as WordHash);

const isCorrectWord = (word: string[]): boolean => {
    // check if word is correct
    return CORRECT_LETTERS.every((letter: string, index: number): boolean => {
        return letter === word[index];
    });
};

const Game: FC = () => {
    const [guesses, setGuesses] = useState<TileState[][]>([]);
    const [input, setInput] = useState<string[]>([]);
    const [currentRow, setCurrentRow] = useState<number>(0);
    const [isWinner, setIsWinner] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [invalidWord, setInvalidWord] = useState<boolean>(false);

    useEffect(() => {
        const keyDown = ({ key, keyCode }: any) => {
            if (isWinner || gameOver) {
                return;
            }

            if (key === 'Backspace' && input.length > 0) {
                setInput(input.slice(0, input.length - 1));
            } else if (keyCode >= 65 && keyCode <= 90 && input.length < WORD_LENGTH) {
                setInput([...input, key.toUpperCase()]);
            } else if (key === 'Enter' && isValidWord(input)) {
                setGuesses([...guesses, guessWord(input)]);

                if (isCorrectWord(input)) {
                    setIsWinner(true);
                } else if (currentRow === ROW_COUNT - 1) {
                    setGameOver(true);
                } else {
                    setCurrentRow(currentRow + 1);
                    setInput([]);
                }
            }
        };

        window.addEventListener('keydown', keyDown);

        return () => {
            window.removeEventListener('keydown', keyDown);
        };
    }, [input, currentRow, guesses, isWinner, gameOver]);

    const isValidWord = (word: string[]): boolean => {
        if (word.length < 5) {
            return false;
        }

        if (!GUESSABLE_WORDS.includes(word.join(''))) {
            setInvalidWord(true);
            return false;
        }

        setInvalidWord(false);
        return true;
    };

    const guessWord = (letters: string[]): TileState[] => {
        const copyWinningHash = { ...CORRECT_WORD_HASH };

        const tiles: TileState[] = letters.map((letter: string, idx: number): TileState => {
            const tileState: TileState = {
                letter,
                status: TileStatus.None,
            };

            if (CORRECT_LETTERS[idx] === letter) {
                tileState.status = TileStatus.Good;
                copyWinningHash[letter]--;
            }

            return tileState;
        });

        for (let i = 0; i < letters.length; i++) {
            if (tiles[i].status === TileStatus.Good) {
                continue;
            }

            if (copyWinningHash[letters[i]]) {
                copyWinningHash[letters[i]]--;
                tiles[i].status = TileStatus.Used;
            }
        }

        return tiles;
    };

    const renderRows = (currentRow: number) => {
        let rows = [];

        for (let i = 0; i < ROW_COUNT; i++) {
            let rowInput: TileState[] = [];

            if (i < guesses.length) {
                rowInput = guesses[i];
            } else if (i === currentRow) {
                rowInput = input.map((letter) => {
                    return {
                        letter,
                        status: TileStatus.Blank,
                    } as TileState;
                });
            }

            rows.push(<GameRow key={i} row={rowInput} />);
        }

        return rows;
    };

    return (
        <div>
            <div className="messages">
                {invalidWord && <div className="container invalid-word">Guessed word is invalid</div>}
                {(isWinner || gameOver) && <EndGame isWinner={isWinner} correctWord={CORRECT_WORD} />}
            </div>

            <div className="flex-center column">{renderRows(currentRow)}</div>
        </div>
    );
};

export default Game;
