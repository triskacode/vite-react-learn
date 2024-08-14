/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cva', 'cn'],
};

export default config;
