import "./styles.css";
import { Transformer } from "markmap-lib";
import * as markmap from "markmap-view";
import { useEffect, useRef } from "react";
const { Markmap, loadCSS, loadJS } = markmap;

const splitHeights = [1, 2, 3];
const i = 2;
const sY = splitHeights.slice(0, i).reduce((p, c) => p + c, 0);
// console.log(sY);

const transformer = new Transformer();

const markdown = `
# main
## title1
### love
  1. 1
  2. 2
  4. 4
  4. 4
  4. 4
  4. 4

## title2
`;
// 1. transform markdown

const useM = (md, option) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.innerHTML = "";
    const { root, features } = transformer.transform(md);
    const { styles, scripts } = transformer.getUsedAssets(features);
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, { getMarkmap: () => markmap });
    Markmap.create(ref.current, option, root);
  }, [md, option]);
  return <svg ref={ref} style={{ width: 800, height: 800 }}></svg>;
};
export default function App() {
  const M = useM(markdown);
  return (
    <div>
      <h2>Start editing to see some magic happen!</h2>
      {M}
      <h1>Hello CodeSandbox</h1>
    </div>
  );
}
