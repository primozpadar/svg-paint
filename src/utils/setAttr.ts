// better than el.setAttribute because it cant accept value as a string or a number
export default function setAttr(element: Element, name: string, value: number | string) {
  element.setAttribute(name, value.toString());
}
