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
    input: "./src/index.js", // Updated to .ts if you're using TypeScript for the entry file
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
    external: ["react", "react-dom"], // Add react and react-dom to externals
    plugins: [
      postcss({
        plugins: [
          tailwindcss(), // Add Tailwind CSS plugin
          autoprefixer(), // Add Autoprefixer plugin
        ],
        minimize: true,
        extract: true, // Extract CSS to a separate file
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Ensure Babel processes TypeScript files
      }),
      external(),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Add .ts and .tsx extensions here as well
      }),
      commonjs(), // Add this plugin to handle CommonJS modules
      typescript({ tsconfig: "./tsconfig.json" }), // Add TypeScript support
      terser(),
    ],
  },
];

export default config;
