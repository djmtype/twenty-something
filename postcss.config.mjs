import postcssGlobalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";
// import OpenProps from "open-props";
import postcssJitProps from "postcss-jit-props";



export default {
  plugins: [
    postcssGlobalData({
      files: ["./node_modules/open-props/css/media-queries.css"],
    }),
    postcssPresetEnv({
      stage: 2,
      features: {
        "logical-properties-and-values": false,
        "prefers-color-scheme-query": false,
        "gap-properties": false,
        "custom-properties": false,
        "dir-pseudo-class": false,
        "focus-within-pseudo-class": false,
        "focus-visible-pseudo-class": false,
        "color-functional-notation": false,
        "oklab-function": false,
        "light-dark-function": false
      },
      autoprefixer: false,
    }),
    postcssJitProps(
      // OpenProps,
      {
        files: [
          "./node_modules/open-props/open-props.min.css",
          // "./node_modules/open-props/css/shadows.css",
          "./node_modules/open-props/css/color/hues.oklch.css",
          "./node_modules/open-props/css/color/palette.oklch.css",
          "./src/styles/theme/gray.oklch.css",
          "./src/styles/theme/global.css",
        ],
      },
    ),
  ],
};
