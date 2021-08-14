export class ColorsBar {
  el: HTMLDivElement;
  static colors: { [key: string]: string } = {};

  constructor(mountTo: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'colorsBar';
    mountTo.appendChild(this.el);
  }

  addPicker(
    label: string,
    colorKey: string,
    onChange?: (color: string) => void,
    defaultColor: string = '#000000',
  ) {
    const pickerContainer = document.createElement('div');
    pickerContainer.className = 'pickerContainer';

    const picker = document.createElement('input');
    picker.type = 'color';
    if (defaultColor) picker.value = defaultColor;

    ColorsBar.colors[colorKey] = defaultColor;
    picker.addEventListener('input', (e: Event) => {
      const el = e.target as HTMLInputElement;
      ColorsBar.colors[colorKey] = el.value;
      onChange && onChange(el.value);
    });

    const labelElement = document.createElement('label');
    labelElement.innerHTML = label;

    pickerContainer.appendChild(picker);
    pickerContainer.appendChild(labelElement);
    this.el.appendChild(pickerContainer);
  }
}
