/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        semi: false,
        trailingComma: "es5",
      },
    },
  ],
};

export default config;