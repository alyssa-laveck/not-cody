import { FC } from 'react';

const EndGame: FC<{ isWinner: boolean }> = ({ isWinner }) => {
    const winningText = 'Winner Winner, Chicken Dinner!';
    const losingText = 'Loser Loser, Chicken Snoozer!';

    const gameResult = isWinner ? winningText : losingText;

    return <div className="end-game-container">
        {gameResult}
    </div>;
};
export default EndGame;
