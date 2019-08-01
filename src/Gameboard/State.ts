import { PinColors } from "../Types/PinColors";
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
    codeColors: PinColors[];

    /**
     * When true the player won the game.
     */
    gameWon: boolean;

    /**
     * When true, the player lost the game.
     */
    gameLost: boolean;
}