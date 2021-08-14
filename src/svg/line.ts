import setAttr from '../utils/setAttr';
import { Point } from './point';
import { Svg } from './svg';

export class Line {
  el: SVGLineElement;
  stroke: Pick<Stroke, 'color' | 'width'> = { color: '#000', width: 1 };
  p1: Point;
  p2: Point;

  constructor(mountTo: Svg, p1: Point, p2: Point, options?: { stroke: Partial<Stroke> }) {
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    mountTo.el.appendChild(this.el);

    this.p1 = p1;
    this.p2 = p2;
    this.updatePoints({ p1, p2 });

    this.updateStroke(options?.stroke || {});
  }

  updatePoints(points: { p1?: Point; p2?: Point }) {
    if (points.p1) {
      this.p1 = points.p1;
      setAttr(this.el, 'x1', this.p1.x);
      setAttr(this.el, 'y1', this.p1.y);
    }
    if (points.p2) {
      this.p2 = points.p2;
      setAttr(this.el, 'x2', this.p2.x);
      setAttr(this.el, 'y2', this.p2.y);
    }
  }

  updateStroke(stroke: Partial<Stroke>) {
    Object.assign(this.stroke, stroke);
    setAttr(this.el, 'stroke', this.stroke.color);
    setAttr(this.el, 'stroke-width', this.stroke.width);
  }
}
