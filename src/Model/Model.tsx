import React from "react";
import ReactDOM from "react-dom";
import { Properties } from "./Properties";

export class Modal extends React.Component<Properties> {

    private el: HTMLDivElement;

    private modalRoot: HTMLElement | null;

    constructor(props: Properties) {
        super(props);
        this.el = document.createElement("div");
        this.modalRoot = document.getElementById("portalRoot");
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

        let left = 0;
        let top = 0;
        if (this.props.element.current) {
            const rectangle = this.props.element.current.getBoundingClientRect();
            left = rectangle.left;
            top = rectangle.bottom;
        }

        const s: React.CSSProperties = {
            position: "absolute",
            display: "flex",
            left,
            top,
            flexDirection: "column",
            boxSizing: "border-box",
        };

        return ReactDOM.createPortal(
            <div style={s}>
                {
                    this.props.children
                }
            </div>,
            this.el,
        );
    }
}