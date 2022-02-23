import { Dispatch, SetStateAction } from "react";
import { VizService } from "./VizService";
import { $ } from "./VizService/domHelper";

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
    let _isPanning: boolean = false;
    let prev_id: string = "";
    let point = svg.createSVGPoint();
    let origin = svg.createSVGPoint();
    let info: HTMLElement | null = document.getElementById("tile_info");
    let localZoomLevel = VizService.getInstance().zoom;
    if (info == null) {
        info = $("pre#tile_info", {
            style: "position: relative; top: -100%; left:4px; padding: 4px;",
        });
        if (svg.parentElement) svg.parentElement.append(info);
    } else {
        if (svg.parentElement) {
            svg.parentElement.removeChild(info);
            svg.parentElement.append(info);
        }
    }
    console.log(info);

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
        if (event.target && info != null) {
            let target = event.target as SVGElement;
            if (target.nodeName === "polygon") {
                if (target.id != prev_id) {
                    let tile = VizService.getInstance().renderer?.quickMap.get(
                        target.id.slice(1)
                    );
                    info.textContent = JSON.stringify(tile, null, 2);
                    prev_id = target.id;
                }
            } else if (prev_id != "") {
                info.textContent = "";
                prev_id = "";
            }
        }
    }
    function MouseWheel(this: SVGSVGElement, event: WheelEvent) {
        event.preventDefault();
        let newLocalZoomLevel = Math.max(
            Math.min(localZoomLevel + event.deltaY * -1, 2000),
            200
        );
        svg.viewBox.baseVal.x += -(newLocalZoomLevel - localZoomLevel) / 4;
        svg.viewBox.baseVal.y += -(newLocalZoomLevel - localZoomLevel) / 4;
        svg.viewBox.baseVal.width = newLocalZoomLevel;
        svg.viewBox.baseVal.height = newLocalZoomLevel;
        localZoomLevel = newLocalZoomLevel;
        VizService.getInstance().zoom = localZoomLevel;
    }
    function MouseLeave(this: SVGSVGElement, event: MouseEvent) {
        if (info) {
            info.textContent = "";
        }
    }
    // Register events
    svg.addEventListener("mousedown", MouseDown);
    svg.addEventListener("mouseup", MouseUp);
    svg.addEventListener("mousemove", MouseMove);
    svg.addEventListener("wheel", MouseWheel);
    svg.addEventListener("mouseleave", MouseLeave);

    return () => {
        svg.removeEventListener("mousedown", MouseDown);
        svg.removeEventListener("mouseup", MouseUp);
        svg.removeEventListener("mousemove", MouseMove);
        svg.removeEventListener("wheel", MouseWheel);
        svg.addEventListener("mouseleave", MouseLeave);
    };
}
