import { FC, useEffect, useState, useCallback, useRef } from 'react';
import GameRow from './game-row.tsx';

const ROW_COUNT = 6;
const WORD_LENGTH = 5;

const Game: FC = () => {
    const [input, setInput] = useState<string[]>([]);
    const keyDown = useCallback(({ key, keyCode }) => {
        const backspaceCb = (prev: string[]): string[] => {
            if (prev.length > 0) {
                return prev.slice(0, prev.length - 1);
            }

            return prev;
        };
        const appendCb = (prev: string[]): string[] => {
            if (prev.length < WORD_LENGTH) {
                return [...prev, key.toUpperCase()];
            }

            return prev;
        };

        if (key === 'Backspace') {
            setInput(backspaceCb);
        } else if (keyCode >= 65 && keyCode <= 90) {
            setInput(appendCb);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', keyDown);

        return () => {
            window.removeEventListener('keydown', keyDown);
        };
    }, [keyDown]);

    const renderRows = (count) => {
        let rows = [];

        for (let i = 0; i < count; i++) {
            rows.push(<GameRow key={i} letters={input} />);
        }

        return rows;
    };

    return <div className="flex-center column">{renderRows(ROW_COUNT)}</div>;
};

export default Game;
