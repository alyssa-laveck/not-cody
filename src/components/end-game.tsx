import { FC } from 'react';

interface EndGameProps {
    isWinner: boolean;
    correctWord: string;
}

const EndGame: FC<EndGameProps> = ({ isWinner, correctWord }) => {
    const winningText = 'Winner Winner, Chicken Dinner!';
    const losingText = `Loser Loser, Chicken Snoozer! The correct word is "${correctWord}".`;

    const gameResult = isWinner ? winningText : losingText;

    return <div className="container">
        {gameResult}
    </div>;
};
export default EndGame;
