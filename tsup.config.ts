import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs"],
  entry: ["./src/index.tsx"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  external: ["react", "react-dom"],
});
