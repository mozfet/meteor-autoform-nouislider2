Package.describe({
  name: 'mozfet:autoform-materialize-nouislider2',
  summary: 'Material styled slider for autoform.',
  version: '1.1.2',
  git: 'https://github.com/mozfet/meteor-autoform-nouislider2'
})

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.8');
  api.use(['ecmascript','templating@1.3.2', 'underscore', 'reactive-var',
    'blaze@2.3.3'], 'client');
  api.use('fourseven:scss@4.10.0');
  api.use('aldeed:autoform@6.3.0');
  api.addFiles('autoform-nouislider.js', 'client');
  api.addFiles('style.scss', 'client', {isImport: true});
})
