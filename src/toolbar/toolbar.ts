import "./toolbar.scss";

export class Toolbar {
  el: HTMLDivElement;

  constructor(mountTo: HTMLElement) {
    this.el = document.createElement("div");
    this.el.id = "toolbar";
    mountTo.appendChild(this.el);
  }

  addButton(
    text: string,
    onClick: (changeActive: (val: boolean) => void) => void
  ) {
    const btn = document.createElement("button");
    btn.textContent = text;
    this.el.appendChild(btn);

    const changeActive = (val: boolean) => {
      console.log("hello");
      btn.classList.toggle("active", val);
    };

    btn.addEventListener("click", () => onClick(changeActive));
    return btn;
  }

  changeVisibility(visible: boolean) {
    this.el.style.display = visible ? "flex" : "none";
  }
}
