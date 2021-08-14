import './global.scss';
import { Save } from './save';
import { Line } from './svg/line';
import { Rectangle } from './svg/rectangle';
import { Svg } from './svg/svg';
import { Toolbar } from './toolbar/toolbar';

const app = document.querySelector<HTMLDivElement>('#app')!;

// main svg element
const bgColor = 'transparent';
const svg = new Svg(app, { height: '100vh', width: '100vw' });
svg.setBackgroundColor(bgColor);

const toolbar = new Toolbar(app);

let tempLine: Line;
toolbar.addDrawButton('Line', svg, {
  onStart: (p1) => (tempLine = new Line(svg, p1, p1)),
  onMove: (p2) => tempLine.updatePoints({ p2 }),
});

let tempRect: Rectangle;
toolbar.addDrawButton('Rectangle', svg, {
  onStart: (p1) => (tempRect = new Rectangle(svg, p1, p1)),
  onMove: (p2) => tempRect.updatePoints({ p2 }),
});

toolbar.addButton('Screenshot', () => Save.screenshot(svg, bgColor));
toolbar.addButton('Save SVG', () => Save.svg(svg));
