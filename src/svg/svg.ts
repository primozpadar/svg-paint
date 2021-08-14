import setAttr from '../utils/setAttr';

export class Svg {
  el: SVGElement;
  container: HTMLDivElement;
  private rectBg: SVGRectElement;

  constructor(mountTo: HTMLElement, size: Size) {
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    setAttr(this.el, 'width', size.width.toString());
    setAttr(this.el, 'height', size.height.toString());
    setAttr(this.el, 'fill', '#ff0000');

    this.container = document.createElement('div');
    this.container.id = 'svg-container';
    this.container.appendChild(this.el);

    this.rectBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    setAttr(this.rectBg, 'width', '100%');
    setAttr(this.rectBg, 'height', '100%');
    setAttr(this.rectBg, 'fill', 'transparent');
    this.el.insertBefore(this.rectBg, this.el.firstChild);

    mountTo.appendChild(this.el);
  }

  setBackgroundColor(color: string) {
    setAttr(this.rectBg, 'fill', color);
  }

  setCursor(cursor: CSSStyleDeclaration['cursor']) {
    this.el.style.cursor = cursor;
  }
}
