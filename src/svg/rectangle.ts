import setAttr from '../utils/setAttr';
import { Point } from './point';
import { Svg } from './svg';

export class Rectangle {
  el: SVGRectElement;
  p1: Point;
  p2: Point;
  stroke: Stroke = { color: '#000', width: 1 };
  fill: string = 'transparent';

  constructor(mountTo: Svg, p1: Point, p2: Point, options?: { stroke?: Stroke }) {
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    mountTo.el.appendChild(this.el);

    this.p1 = p1;
    this.p2 = p2;
    this.updatePoints({ p1, p2 });

    this.updateStroke(options?.stroke || {});
  }

  updatePoints(points: { p1?: Point; p2?: Point }) {
    if (points.p1) this.p1 = points.p1;
    if (points.p2) this.p2 = points.p2;

    setAttr(this.el, 'x', Math.min(this.p1.x, this.p2.x));
    setAttr(this.el, 'y', Math.min(this.p1.y, this.p2.y));
    setAttr(this.el, 'width', Math.abs(this.p1.x - this.p2.x));
    setAttr(this.el, 'height', Math.abs(this.p1.y - this.p2.y));
  }

  updateStroke(stroke: Partial<Stroke>) {
    Object.assign(this.stroke, stroke);
    this.updateStyle();
  }

  updateFill(fill: string) {
    this.fill = fill;
    this.updateStyle();
  }

  private updateStyle() {
    const style = `fill:${this.fill};stroke-width:${this.stroke.width};stroke:${this.stroke.color}`;
    setAttr(this.el, 'style', style);
  }

  remove() {
    this.el.remove();
  }
}
