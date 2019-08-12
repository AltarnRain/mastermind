/**
 * A model to reurn hints
 */

export interface Hints {
    /**
     * The number of colors that are in the right position.
     */
    rightColorRightPosition: number;

    /**
     * The number of colors that are in the wrong position but exists in the code.
     */
    rightColorWrongPosition: number;
}