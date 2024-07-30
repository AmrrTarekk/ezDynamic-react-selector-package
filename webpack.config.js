const path = require("path");

module.exports = {
  // Entry point for the application
  entry: "./src/index.tsx",

  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    module: true, // Ensure module type is handled
    library: {
      type: "module", // Output as an ES module
    },
    clean: true, // Clean the output directory before each build
  },

  // Enable ES module syntax
  experiments: {
    outputModule: true,
  },

  // Module rules to handle different types of files
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env", // Compile modern JavaScript to compatible versions
              "@babel/preset-react", // Transform JSX into JavaScript
              "@babel/preset-typescript", // Compile TypeScript to JavaScript
            ],
            plugins: ["@babel/plugin-proposal-optional-chaining"], // Enable optional chaining support
          },
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource", // Handle SVGs as assets
      },
    ],
  },

  // Resolve file extensions and aliases
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },

  // Development settings (optional)
  devtool: "source-map", // Generate source maps for debugging
};
