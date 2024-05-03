import postcssGlobalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";
// import OpenProps from "open-props";
import postcssJitProps from "postcss-jit-props";



export default {
  plugins: [
    postcssGlobalData({
      // files: [
      //   "./node_modules/open-props/src/props.media.css",

      // ],
      files: ["./node_modules/open-props/css/media-queries.css"],
    }),
    postcssPresetEnv({
      stage: 0,
      features: {
        "logical-properties-and-values": false,
        "prefers-color-scheme-query": false,
        "gap-properties": false,
        "custom-properties": false,
        "dir-pseudo-class": false,
        "focus-within-pseudo-class": false,
        "focus-visible-pseudo-class": false,
        "color-functional-notation": false,
        "oklab-function": false
      },
      autoprefixer: false,
    }),
    postcssJitProps(
      // OpenProps,
      {
        files: [
          "./node_modules/open-props/open-props.min.css",
          // "./node_modules/open-props/src/props.colors-oklch.css",
          "./node_modules/open-props/css/color/hues.oklch.css",
          "./node_modules/open-props/css/color/palette.oklch.css",
          "./src/styles/common/gray.oklch.css",
          "./src/styles/themes/global.css",
        ],
      },
    ),
  ],
};
