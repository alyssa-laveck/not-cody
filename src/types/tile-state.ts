import { TileStatus } from "../components/game-tile"

export interface TileState {
    letter: string,
    status: TileStatus
}