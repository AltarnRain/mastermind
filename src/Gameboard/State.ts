import { Colors } from "../Types/Colors";

/**
 * Gameboard state
 */

export interface State {
    currentRow: number;

    gameRows: GameRow[];

    hiddenColors: Colors[];
}

interface GameRow {

    pinColors: Colors[];

    hintColors: Colors[];
}