/**
 * Units tests for helper functions.
 */

import "jest";
import { HintProvider } from "./HelperFunctions";
import { PinColors } from "./Types/PinColors";

/**
 * Red = right position right color
 * White = wrong position right color
 * This is a short hand to keep unit test descriptions short and readable.
 */

it("returns 4 red when the guess matches the code", () => {
    // Arrange
    const codeColors: PinColors[] = ["orange", "yellow", "blue", "green"];
    const guessedColors: PinColors[] = ["orange", "yellow", "blue", "green"];

    // Act
    const result = HintProvider(guessedColors, codeColors);

    // Assert
    expect(result.rightColorRightPosition).toBe(4);
    expect(result.rightColorWrongPosition).toBe(0);
});

it("returns 4 for right color wrong position when the guess matches the code", () => {
    // Arrange
    const codeColors: PinColors[] = ["orange", "yellow", "blue", "green"];
    const guessedColors: PinColors[] = ["green", "blue", "yellow", "orange"];

    // Act
    const result = HintProvider(guessedColors, codeColors);

    // Assert
    expect(result.rightColorRightPosition).toBe(0);
    expect(result.rightColorWrongPosition).toBe(4);
});

it("returns 1 red, 1 white", () => {
    // Arrange
    const codeColors: PinColors[] = ["orange", "yellow", "blue", "green"];
    const guessedColors: PinColors[] = ["orange", "black", "yellow", "black"];

    // Act
    const result = HintProvider(guessedColors, codeColors);

    // Assert
    expect(result.rightColorRightPosition).toBe(1);
    expect(result.rightColorWrongPosition).toBe(1);
});

it("returns 1 red", () => {
    // Arrange
    const codeColors: PinColors[] = ["orange", "yellow", "blue", "green"];
    const guessedColors: PinColors[] = ["orange", "orange", "black", "black"];

    // Act
    const result = HintProvider(guessedColors, codeColors);

    // Assert
    expect(result.rightColorRightPosition).toBe(1);
    expect(result.rightColorWrongPosition).toBe(0);
});

it("returns 1 red and 1 white", () => {
    // Arrange
    const codeColors: PinColors[] = ["orange", "yellow", "orange", "green"];
    const guessedColors: PinColors[] = ["orange", "orange", "black", "black"];

    // Act
    const result = HintProvider(guessedColors, codeColors);

    // Assert
    expect(result.rightColorRightPosition).toBe(1);
    expect(result.rightColorWrongPosition).toBe(1);
});

it("should return 3x red, one black", () => {
    // Arrange
    const codeColors: PinColors[] = ["green", "green", "blue", "cyan"];
    const guessedColors: PinColors[] = ["green", "purple", "blue", "cyan"];

    // Act
    const result = HintProvider(guessedColors, codeColors);

    // Assert
    expect(result.rightColorRightPosition).toBe(3);
    expect(result.rightColorWrongPosition).toBe(0);
});