const withNextra = require('nextra')({
  theme: 'nextra-theme-docs', // @TODO: Allow our own theme here as we want to use our own Layout!
  themeConfig: './theme.config.tsx',
});

const i18n = require('./scripts/i18n');

// @TODO: Does this support any Next.js config option?
// @TODO: Enable Automatic Language Detection and Trailing Default Language
module.exports = withNextra({
  i18n: {
    defaultLocale: 'en',
    locales: i18n.module
  },
  trailingSlash: true,
});
