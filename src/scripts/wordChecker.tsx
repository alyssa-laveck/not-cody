// This file is intended to act as a fake API backend for getting word results
import { WORD_LENGTH, WINNING_WORD } from "../constants.ts";
import { TileStatus } from "../constants.ts";

const WORD_FEEDBACK = {
    success: 1,
    isCorrectLength: 0,
    isRealWord: 0,
    isWinningWord: 0,
    wordFeedback: [],
};

function isWordLengthValid(word: string[], targetWordLength: number = WORD_LENGTH): number {
    return Number(word.length === targetWordLength);
}

function isRealWord(word: string[]): number {
    // Not going to bother with API right now, just going to return true
    return 1;
}

function getLetterFeedbackArray(word: string[], winningWord: string[] = WINNING_WORD): Array<string> {
    let letterFeedBackArray = [];

    for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
        if (winningWord.includes(word[letterIndex]) === false) {
            letterFeedBackArray.push(TileStatus.None);
        } else if (winningWord[letterIndex] !== word[letterIndex]) {
            letterFeedBackArray.push(TileStatus.Used);
        } else {
            letterFeedBackArray.push(TileStatus.Good);
        }
    }

    return letterFeedBackArray;
}

function getWinningWord(): string[] {
    return WINNING_WORD;
}

export function isValidInput(word: string[]): number {
    return isWordLengthValid(word);
};

export function isWinningWord(word: string[]): number {
    return Number(word === getWinningWord());
};

export function getWordFeedback(word: string[], targetWordLength: number = WORD_LENGTH): object {
    WORD_FEEDBACK.isCorrectLength = isWordLengthValid(word, targetWordLength);
    WORD_FEEDBACK.isRealWord = isRealWord(word);
    WORD_FEEDBACK.isWinningWord = isWinningWord(word);
    WORD_FEEDBACK.wordFeedback = getLetterFeedbackArray(word);

    return WORD_FEEDBACK;
};
