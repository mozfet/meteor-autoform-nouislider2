Package.describe({
  name: 'mozfet:autoform-materialize-nouislider2',
  summary: 'Dual value slider for autoform.',
  version: '0.0.1',
  git: 'https://github.com/mozfet/meteor-autoform-nouislider'
});

Npm.depends({
  'nouislider': '9.2.0'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.4');
  api.use(['templating', 'underscore', 'reactive-var', 'blaze'], 'client');
  api.use('ecmascript@0.7.2');
  // api.use('aldeed:template-extension@4.1.0');
  api.use('aldeed:autoform@6.0.0');
  api.addFiles([
    'index.js',
  ], 'client');
});
