/**
 * Properties for the model component
 */

export interface Properties {
    /**
     * The element to which the Modal attaches itself.
     */
    element: React.RefObject<HTMLElement>;

    /**
     * positions the child component. Left is default, center has to be specified
     */
    position?: "left" | "center";

    /**
     * When set, the width of the child component is multiplied by this number.
     */
     widthMultiplier?: number;

     /**
      * when set, the height of the child component is multiplied by this number.
      */
     heightMultiplier?: number;

     /**
      * Reference to the DIV element that contains the work area in which children can be shown.
      */
     workAreaRef?: React.RefObject<HTMLDivElement>;

     /**
      * Event called when the user clicks outside the model.
      */
     onUserClickedOutside?(): void;
}