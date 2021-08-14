import "./global.scss";
import { Svg } from "./svg/svg";
import { Toolbar } from "./toolbar/toolbar";

const app = document.querySelector<HTMLDivElement>("#app")!;

// main svg element
const svg = new Svg(app, { height: "100vh", width: "100vw" });
svg.setBackgroundColor("#141b20");

const toolbar = new Toolbar(app);
toolbar.addButton("Hello world", () => console.log("hello world"));
