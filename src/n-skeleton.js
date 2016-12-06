var helpers = require('./native-component-helpers');

AFRAME.registerComponent('n-skeleton', {
	schema: {
		attachTo: { type: 'string' }
	}
	init: helpers.nativeComponentInit,
	remove: helpers.nativeComponentRemove,
	update: helpers.nativeComponentUpdate
});
