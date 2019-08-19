/**
 * Menu properties
 */

export interface Properties{
    /**
     * Closes the menu
     */
    onClose?(): void;

    /**
     * Ends the game
     */
    onEndGame?(): void;

    /**
     * handles on code to console click
     */
    onCodeToConsole?(): void;
}