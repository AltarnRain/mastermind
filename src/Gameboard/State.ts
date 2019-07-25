import { Colors } from "../Types/Colors";

/**
 * Gameboard state
 */

export interface State {
    currentRow: number;

    gameRows: GameRow[];
}

interface GameRow {

    pinColors: Colors[];

    hintColors: Colors[];
}