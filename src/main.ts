import './global.scss';
import { Save } from './save';
import { Line } from './svg/line';
import { Rectangle } from './svg/rectangle';
import { Svg } from './svg/svg';
import { InputBar } from './toolbar/inputBar';
import { Toolbar } from './toolbar/toolbar';

const app = document.querySelector<HTMLDivElement>('#app')!;

// main svg element
const svg = new Svg(app, { height: '100vh', width: '100vw' });

const toolbar = new Toolbar(app);
const inputBar = new InputBar(app);
inputBar.addPicker(
  'Background',
  'background',
  (color) => {
    svg.setBackgroundColor(color);
  },
  'transparent',
);
inputBar.addPicker('Stoke', 'stroke', undefined);
inputBar.addNumberInput('Stroke Width', 'strokeWidth', (val) => console.log(val));

const getStrokeStyle = () => ({ color: InputBar.colors.stroke, width: InputBar.numbers.strokeWidth });

let tempLine: Line;
toolbar.addDrawButton('Line', svg, {
  onStart: (p1) => (tempLine = new Line(svg, p1, p1, { stroke: getStrokeStyle() })),
  onMove: (p2) => tempLine.updatePoints({ p2 }),
});

let tempRect: Rectangle;
toolbar.addDrawButton('Rectangle', svg, {
  onStart: (p1) => (tempRect = new Rectangle(svg, p1, p1, { stroke: getStrokeStyle() })),
  onMove: (p2) => tempRect.updatePoints({ p2 }),
});

toolbar.addButton('Screenshot', () => Save.screenshot(svg, InputBar.colors.background));
toolbar.addButton('Save SVG', () => Save.svg(svg));
