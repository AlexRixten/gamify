import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  options: {
    builder: {
      resolve: {
        alias: {
          'react-native-reanimated': 'react-native-reanimated/lib/module/index',
        },
      },
    },
  },
};

export default config;
