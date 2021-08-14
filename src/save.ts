import './screenshot.scss';
import { Point } from './svg/point';
import { Rectangle } from './svg/rectangle';
import { Svg } from './svg/svg';
import { downloadURL } from './utils/downloadURL';
import getMousePos from './utils/getMousePos';

export class Save {
  private static getScreenshotArea(cb: (p1: Point, p2: Point) => void) {
    const screenshotArea = document.createElement('div');
    screenshotArea.id = 'screenshotArea';
    document.body.appendChild(screenshotArea);

    const svgArea = new Svg(screenshotArea, { height: '100vh', width: '100vw' });

    screenshotArea.addEventListener(
      'mousedown',
      (e) => {
        const start = getMousePos(e);
        const rect = new Rectangle(svgArea, start, start, { stroke: { color: '#fff', width: 2 } });

        let end: Point;
        const updateEnd = (e: MouseEvent) => {
          end = getMousePos(e);
          rect.updatePoints({ p2: end });
        };

        document.addEventListener('mousemove', updateEnd);
        document.addEventListener(
          'mouseup',
          () => {
            document.removeEventListener('mousemove', updateEnd);
            rect.remove();
            cb(start, end);
            screenshotArea.remove();
          },
          { once: true },
        );
      },
      { once: true },
    );
  }

  static screenshot(svg: Svg, bgColor: string) {
    this.getScreenshotArea((p1, p2) => {
      const width = Math.abs(p1.x - p2.x);
      const height = Math.abs(p1.y - p2.y);

      const initialViewbox = svg.el.getAttribute('viewBox');
      svg.el.setAttribute('viewBox', `${p1.x} ${p1.y} ${width} ${height}`);

      const svgData = new XMLSerializer()
        .serializeToString(svg.el)
        .replace('100vh', width + 'px')
        .replace('100vw', '100%');

      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(blob);

      const img = new Image();
      img.src = blobURL;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          alert('canvas not suported!');
          return;
        }

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, width, height);
        downloadURL(canvas.toDataURL('image/png'), 'screenshot');
        URL.revokeObjectURL(blobURL);

        initialViewbox ? svg.el.setAttribute('viewBox', initialViewbox) : svg.el.removeAttribute('viewBox');
      };
    });
  }
}
