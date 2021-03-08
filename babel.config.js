// module.exports = {
//   presets: ['@vue/cli-plugin-babel/preset']
// }

module.exports = {
  // ATTENTION!!
  // Preset ordering is reversed, so `@babel/typescript` will called first
  // Do not put `@babel/typescript` before `@babel/env`, otherwise will cause a compile error
  // See https://github.com/babel/babel/issues/12066
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false
      }
    ],
    '@babel/typescript'
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/transform-runtime',
    'lodash'
  ],
  overrides: [
    {
      test: /\.vue$/,
      plugins: ['@babel/transform-typescript']
    }
  ],
  env: {
    utils: {
      ignore: ['**/*.test.ts', '**/*.spec.ts'],
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: false
          }
        ]
      ],
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['element-plus'],
            alias: {
              '@element-plus': 'element-plus/lib'
            }
          }
        ]
      ]
    }
  }
}
