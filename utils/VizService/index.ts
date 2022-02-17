export type Def = {
    key: string;
    type: string;
    data: any;
};
/**
 * Singleton
 */
export class VizService {
    public static instance: VizService;

    public defs: Map<string, Def> = new Map<string, Def>();
    public root?: SVGSVGElement;

    linkToSVG(svg: SVGSVGElement) {
        this.root = svg;
    }

    public static getInstance(): VizService {
        if (!VizService.instance) {
            VizService.instance = new VizService();
        }

        return VizService.instance;
    }
}
