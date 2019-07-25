import React from "react";
import ReactDOM from "react-dom";

export class Modal extends React.Component<{}> {

    private el: Element;

    private modalRoot: HTMLElement | null;

    constructor() {
        super({});
        this.el = document.createElement("div");
        this.modalRoot = document.getElementById("modelRoot");
    }

    public componentDidMount() {

        if (this.modalRoot) {
            this.modalRoot.appendChild(this.el);
        }
    }

    public componentWillUnmount() {
        if (this.modalRoot) {
            this.modalRoot.removeChild(this.el);
        }
    }

    public render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}