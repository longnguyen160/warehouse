// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.id1frt6os18e9bl9g105wp',
  version: "0.0.1",
  name: 'Warehouse',
  description: 'Warehouse management system',
  author: 'Long Nguyen',
  email: 'longnt@zigvy.com',
});
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('Orientation', 'portrait', 'ios');
App.setPreference('LoadUrlTimeoutValue', '120000');

App.accessRule('*');