/**
 * Contains helper functions.
 */

import { HintColors } from "./Types/HintColors";
import { Hints } from "./Types/Hints";
import { PinColors } from "./Types/PinColors";

/**
 * Provides a Hints model
 * @param {PinColor[]} guessedColors. The colors the player guessed.
 * @param {PinColor[]} codeColors. The colors of the AI generated code.
 */
export function HintProvider(guessedColors: PinColors[], codeColors: PinColors[]): Hints {

    const indexedGuessedColors = guessedColors.map((color, index) => ({ index, color, processed: false }));
    const indexedCodeColors = codeColors.map((color, index) => ({ index, color, processed: false }));

    const returnValue: Hints = { rightColorWrongPosition: 0, rightColorRightPosition: 0 };

    // First check if the player gussed colors in the right position.
    for (let i = 0; i < indexedGuessedColors.length; i++) {
        const guessedColor = guessedColors[i];
        const codeColor = indexedCodeColors.find((c) => c.index === i);

        if (codeColor && codeColor.processed === false) {
            if (guessedColor === codeColor.color) {
                returnValue.rightColorRightPosition++;

                // The hint is done. Remove this element so it is not given as 'Right Color Wrong Position' hint.
                codeColor.processed = true;
            }
        }
    }

    // Check for any correct colors in the wrong position. Any colors that were in the right position
    // have been removed from the codeColorsToCheck array.
    for (let i = 0; i < indexedGuessedColors.length; i++) {
        const guessedColor = indexedGuessedColors[i].color;
        // Not the right position, but this color might be present in the code.
        const foundCodeColor = indexedCodeColors.find((c) => c.color === guessedColor && c.processed === false);

        if (foundCodeColor && foundCodeColor.processed === false) {
            returnValue.rightColorWrongPosition++;

            // The hint is done. Remove this element from the colors to check array.
            foundCodeColor.processed = true;
        }
    }

    return returnValue;
}

export function randomizeArray(hintColorArray: HintColors[]): HintColors[] {

    const newArray = [...hintColorArray];

    for (let i = 0; i < 10; i++) {
        const pos1 = Math.floor(Math.random() * 4);
        const pos2 = Math.floor(Math.random() * 4);
        const pos1Color = newArray[pos1];
        const pos2Color = newArray[pos2];

        if (typeof (pos1Color) !== "undefined" && typeof (pos2Color) !== "undefined") {
            newArray[pos1] = pos2Color;
            newArray[pos2] = pos1Color;
        }
    }

    return newArray;
}