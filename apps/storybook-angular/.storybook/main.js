const path = require('node:path');
const { createRequire } = require('node:module');

const angularPackages = [
  '@angular/animations',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/platform-browser/animations',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  'zone.js'
];

const angularPackageRoot = path.resolve(__dirname, '../../../packages/angular-ui');
const requireFromAngularUi = createRequire(path.join(angularPackageRoot, 'package.json'));

/** @type {import('@storybook/angular').StorybookConfig} */
const config = {
  stories: ['../src/**/*.@(mdx|stories.@(ts))'],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-toolbars"
  ],
  framework: {
    name: "@storybook/angular",
    options: {
      builder: {
        useSWC: false
      }
    }
  },
  staticDirs: [
    { from: '../../../styles', to: '/styles' }
  ],
  docs: {},
  core: {
    disableTelemetry: true
  },
  webpackFinal: async (storybookConfig) => {
    const angularAlias = angularPackages.reduce((alias, pkg) => {
      try {
        let target;
        try {
          const pkgJsonPath = requireFromAngularUi.resolve(
            pkg.endsWith('/package.json') ? pkg : `${pkg}/package.json`
          );
          target = path.dirname(pkgJsonPath);
        } catch {
          target = requireFromAngularUi.resolve(pkg);
        }

        const slashCount = pkg.startsWith('@')
          ? (pkg.match(/\//g)?.length ?? 0)
          : (pkg.split('/').length - 1);
        const isSubpath = pkg.startsWith('@') ? slashCount > 1 : slashCount > 0;
        const aliasKey = isSubpath ? pkg : `${pkg}$`;
        alias[aliasKey] = target;
      } catch (error) {
        if (process.env['DEBUG_STORYBOOK_ALIAS'] === '1') {
          console.warn(`[storybook] skipped alias for ${pkg}: ${error.message}`);
        }
      }
      return alias;
    }, {});

    if (process.env['DEBUG_STORYBOOK_ALIAS'] === '1') {
      console.log('[storybook] Angular aliases:', angularAlias);
    }

    return {
      ...storybookConfig,
      resolve: {
        ...(storybookConfig.resolve ?? {}),
        alias: {
          ...(storybookConfig.resolve?.alias ?? {}),
          'angular-ui': path.join(angularPackageRoot, 'src'),
          ...angularAlias
        }
      }
    };
  }
};

module.exports = config;
