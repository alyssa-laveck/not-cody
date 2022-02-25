import { FC, useEffect, useState, useCallback, useRef } from 'react';
import GameRow from './game-row.tsx';

const ROW_COUNT = 6;
const WORD_LENGTH = 5;

const Game: FC = () => {
    const input = useRef([]);
    const keyDown = useCallback(({ key, keyCode }) => {
        const prevInput = input.current;

        if (key === 'Backspace' && prevInput.length > 0) {
            input.current = prevInput.slice(0, prevInput.length - 1);
        } else if (prevInput.length < WORD_LENGTH) {
            if (keyCode >= 65 && keyCode <= 90) {
                input.current.push(key.toUpperCase());
            }
        }

        // console.log(input.current);
    }, [input]);

    useEffect(() => {
        console.log('subscribe');
        window.addEventListener('keydown', keyDown);

        return () => {
            console.log('unsubscribe');
            window.removeEventListener('keydown', keyDown);
        };
    }, [keyDown]);

    const renderRows = (count) => {
        let rows = [];

        for (let i = 0; i < count; i++) {
            rows.push(<GameRow key={i} letters={input.current} />);
        }

        return rows;
    };

    return <div className="flex-center column">{renderRows(ROW_COUNT)}</div>;
};

export default Game;
