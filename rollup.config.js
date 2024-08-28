import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const config = [
  {
    input: "./src/index.js",
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
    external: ["react", "react-dom"],
    plugins: [
      postcss({
        plugins: [
          tailwindcss(), // Add Tailwind CSS plugin
          autoprefixer(), // Add Autoprefixer plugin
        ],
        minimize: true,
        extract: "dist/styles.css", // Extract CSS to a separate file
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
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
  },
];

export default config;
