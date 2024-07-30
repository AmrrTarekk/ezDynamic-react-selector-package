import { defineConfig } from "tsup";
import babel from "esbuild-plugin-babel";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.tsx"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.loader = {
      ".svg": "file",
    };
    options.plugins = [
      babel({
        filter: /\.tsx?$/,
        configFile: "./.babelrc",
      }),
    ];
  },
});
