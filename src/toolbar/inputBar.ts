export class InputBar {
  el: HTMLDivElement;
  static colors: { [key: string]: string } = {};
  static numbers: { [key: string]: number } = {};

  constructor(mountTo: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'inputBar';
    mountTo.appendChild(this.el);
  }

  addPicker(
    label: string,
    colorKey: string,
    onChange?: (color: string) => void,
    defaultColor: string = '#000000',
  ) {
    const pickerContainer = document.createElement('div');
    pickerContainer.className = 'inputContainer';

    const picker = document.createElement('input');
    picker.type = 'color';
    if (defaultColor) picker.value = defaultColor;

    InputBar.colors[colorKey] = defaultColor;
    picker.addEventListener('input', (e: Event) => {
      const el = e.target as HTMLInputElement;
      InputBar.colors[colorKey] = el.value;
      onChange && onChange(el.value);
    });

    const labelElement = document.createElement('label');
    labelElement.innerHTML = label;

    pickerContainer.appendChild(picker);
    pickerContainer.appendChild(labelElement);
    this.el.appendChild(pickerContainer);
  }

  addNumberInput(label: string, numberKey: string, onChange: (value: number) => void) {
    const pickerContainer = document.createElement('div');
    pickerContainer.className = 'inputContainer';

    const picker = document.createElement('input');
    picker.type = 'number';
    picker.value = '1';

    InputBar.numbers[label] = 1;
    picker.addEventListener('input', (e) => {
      const el = e.target as HTMLInputElement;
      const value = parseInt(el.value);
      InputBar.numbers[numberKey] = value;
      onChange && onChange(value);
    });

    const labelElement = document.createElement('label');
    labelElement.innerHTML = label;

    pickerContainer.appendChild(picker);
    pickerContainer.appendChild(labelElement);
    this.el.appendChild(pickerContainer);
  }
}
