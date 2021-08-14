import { Point } from '../svg/point';
import { Svg } from '../svg/svg';
import getMousePos from '../utils/getMousePos';
import './toolbar.scss';

type ActiveBtnFn = (val: boolean) => void;

export class Toolbar {
  el: HTMLDivElement;

  constructor(mountTo: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'toolbar';
    mountTo.appendChild(this.el);
  }

  addButton(text: string, onClick: (changeActive: ActiveBtnFn) => void) {
    const btn = document.createElement('button');
    btn.textContent = text;
    this.el.appendChild(btn);

    const changeActive: ActiveBtnFn = (val) => {
      btn.classList.toggle('active', val);
    };

    btn.addEventListener('click', () => onClick(changeActive));
    return btn;
  }

  changeVisibility(visible: boolean) {
    this.el.style.display = visible ? 'flex' : 'none';
  }

  addDrawButton(
    text: string,
    svg: Svg,
    handlers: {
      onStart: (p1: Point) => void;
      onMove: (p2: Point) => void;
    },
  ) {
    const mouseDownHandler = (e1: MouseEvent) => {
      const p1 = getMousePos(e1);
      handlers.onStart(p1);

      const moveFunc = (e2: MouseEvent) => {
        const p2 = getMousePos(e2);
        handlers.onMove(p2);
      };

      document.addEventListener('mousemove', moveFunc);
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', moveFunc);
        },
        { once: true },
      );
    };

    let active = false;
    this.addButton(text, (changeActive) => {
      changeActive(!active);
      if (active) {
        svg.setCursor('default');
        svg.el.removeEventListener('mousedown', mouseDownHandler);
      } else {
        svg.setCursor('crosshair');
        svg.el.addEventListener('mousedown', mouseDownHandler);
      }
      active = !active;
    });
  }
}
