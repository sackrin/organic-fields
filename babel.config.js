module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@sackrin/organic-property': '.packages/organic-property/src',
            node_modules: './node_modules',
          },
        },
      ],
      '@babel/plugin-transform-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    env: {
      build: {
        ignore: ['**/*.test.ts', '__tests__'],
      },
    },
    ignore: ['node_modules'],
  };
};
