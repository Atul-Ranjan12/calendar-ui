import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
// Removed tailwindcss and autoprefixer imports as they are not used

const config = [
  {
    input: "./src/index.ts", // Update to the correct entry point (use .tsx if using TypeScript)
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    external: ["react", "react-dom"], // Exclude peer dependencies
    plugins: [
      postcss({
        plugins: [
          // Add tailwindcss and autoprefixer here if used in PostCSS config
          require("tailwindcss")(),
          require("autoprefixer")(),
        ],
        minimize: true,
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      external(),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true, // Ensure TypeScript generates declaration files
        declarationDir: "dist/types", // Output directory for declaration files
        rootDir: "src", // Root directory of input files
      }),
      terser(),
    ],
  },
];

export default config;
