import { Dispatch, SetStateAction } from "react";
import { VizService } from "./VizService";

export type SVGRegisterEventsOptions = {
    panningMode?: "None" | "MouseDownUp" | "Prop";
    isPanning?: boolean;
};

/** Register Panning Effect to SVG */
export function SVGRegisterEvents(
    svg: SVGSVGElement,
    options: SVGRegisterEventsOptions
) {
    const { panningMode = "MouseDownUp", isPanning = false } = options;
    let _isPanning = false;
    let point = svg.createSVGPoint();
    let origin = svg.createSVGPoint();
    let localZoomLevel = VizService.getInstance().zoom;

    function getPointFromEvent(event: MouseEvent) {
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(ctm.inverse());
    }
    function MouseDown(this: SVGSVGElement, event: MouseEvent) {
        event.preventDefault();
        if (event.button == 0) {
            if (panningMode == "MouseDownUp") _isPanning = true;
            origin = getPointFromEvent(event) as DOMPoint;
        }
    }
    function MouseUp(this: SVGSVGElement, event: MouseEvent) {
        event.preventDefault();
        if (event.button == 0) {
            if (panningMode == "MouseDownUp") _isPanning = false;
        }
    }
    function MouseMove(this: SVGSVGElement, event: MouseEvent) {
        if (
            (panningMode == "MouseDownUp" && _isPanning) ||
            (panningMode == "Prop" && isPanning)
        ) {
            const position = getPointFromEvent(event);
            if (!position) return;

            svg.viewBox.baseVal.x -= position.x - origin.x;
            svg.viewBox.baseVal.y -= position.y - origin.y;
        }
    }
    function MouseWheel(this: SVGSVGElement, event: WheelEvent) {
        event.preventDefault();
        let newLocalZoomLevel = Math.max(
            Math.min(localZoomLevel + event.deltaY * -1, 2000),
            400
        );
        svg.viewBox.baseVal.x += -(newLocalZoomLevel - localZoomLevel) / 4;
        svg.viewBox.baseVal.y += -(newLocalZoomLevel - localZoomLevel) / 4;
        svg.viewBox.baseVal.width = newLocalZoomLevel;
        svg.viewBox.baseVal.height = newLocalZoomLevel;
        localZoomLevel = newLocalZoomLevel;
        VizService.getInstance().zoom = localZoomLevel;
    }
    // Register events
    svg.addEventListener("mousedown", MouseDown);
    svg.addEventListener("mouseup", MouseUp);
    svg.addEventListener("mousemove", MouseMove);
    svg.addEventListener("wheel", MouseWheel);

    return () => {
        svg.removeEventListener("mousedown", MouseDown);
        svg.removeEventListener("mouseup", MouseUp);
        svg.removeEventListener("mousemove", MouseMove);
        svg.removeEventListener("wheel", MouseWheel);
    };
}
