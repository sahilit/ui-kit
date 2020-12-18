import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: pkg.source,
  output: [
    {
      file: "playground/src/component-lib/index.js",
      format: "esm",
      banner: "/* eslint-disable */",
    },
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**",
    }),
    del({ targets: ["dist/*", "playground/src/component-lib"] }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
