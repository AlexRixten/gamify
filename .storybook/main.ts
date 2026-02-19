import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
    // Add TypeScript loader
    webpackConfig.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    // Resolve react-native to react-native-web
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      'react-native$': 'react-native-web',
    };

    // Add .tsx and .ts extensions
    webpackConfig.resolve.extensions = webpackConfig.resolve.extensions || [];
    webpackConfig.resolve.extensions.push('.tsx', '.ts');

    return webpackConfig;
  },
};

export default config;
