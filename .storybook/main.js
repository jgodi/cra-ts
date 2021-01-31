const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        backgrounds: false,
        viewport: false,
        toolbars: false,
      },
    },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      // This config is for the Classes, since we need to perserve the comments
      // in order to display them in the built storybook
      config.optimization = {
        ...config.optimization,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                // preserve comments that start with /**
                comments: /\* /,
              },
            },
          }),
        ],
      };
    }

    return config;
  },
};
