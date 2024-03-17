export default {
  plugins: {
        "@csstools/postcss-global-data": {
          files: ["./node_modules/open-props/src/props.media.css"],
        },
        "postcss-preset-env": {
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
          },
          autoprefixer: false,
        },
        
      }
    }
