import './global.scss';
import { Line } from './svg/line';
import { Svg } from './svg/svg';
import { Toolbar } from './toolbar/toolbar';

const app = document.querySelector<HTMLDivElement>('#app')!;

// main svg element
const svg = new Svg(app, { height: '100vh', width: '100vw' });
svg.setBackgroundColor('#141b20');

const toolbar = new Toolbar(app);

let tempLine: Line;
toolbar.addDrawButton('Line', svg, {
  onStart: (p1) => (tempLine = new Line(svg, p1, p1)),
  onMove: (p2) => tempLine.updatePoints({ p2 }),
});
