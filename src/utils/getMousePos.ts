import { Point } from '../svg/point';

export default function getMousePos(ev: MouseEvent) {
  return new Point(ev.clientX, ev.clientY);
}
