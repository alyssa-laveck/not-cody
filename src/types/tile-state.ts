import { TileStatus } from "../components/game-tile.tsx"

export interface TileState {
    letter: string,
    status: TileStatus
}