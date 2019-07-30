import { Colors } from "../Types/Colors";
import { GameRow } from "./GameRow";

/**
 * Gameboard state
 */

export interface State {

    /**
     * The current row of the game.
     */
    currentRow: number;

    /**
     * All game rows, selected pin colors, etc.
     */
    gameRows: GameRow[];

    /**
     * Colors of the hint boxes.
     */
    hiddenColors: Colors[];
}