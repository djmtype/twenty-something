const postcssGlobalData = require("@csstools/postcss-global-data");
const postcssPresetEnv = require("postcss-preset-env");
// const OpenProps = require("open-props");
const postcssJitProps = require("postcss-jit-props");
const tailwindCss = require("@tailwindcss/postcss");

module.exports = {
  plugins: [
    tailwindCss(),
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
        "oklab-function": false,
      },
      autoprefixer: false,
    }),
    postcssJitProps(
      // OpenProps,
      {
        files: [
          "./node_modules/open-props/open-props.min.css",
          "./node_modules/open-props/css/color/palette.oklch.css",
          "./src/styles/common/gray.oklch.css",
          "./src/styles/themes/global.css",
        ],
      },
    ),
  ],
};
