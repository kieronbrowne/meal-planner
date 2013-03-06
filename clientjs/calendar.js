requirejs.config({
//	baseUrl: '',

	paths: {
		text: 'lib/text'
	},

	shim: {
		'lib/underscore-min': {
			exports: '_'
		},
		'lib/backbone': {
			deps: ['lib/underscore-min']
			, exports: 'Backbone'
		},
		'calendar-app': {
			deps: ['lib/underscore-min', 'lib/backbone']
		}

	}
});

require(['calendar-app'], function(CalApp) {
	window.calApp = new CalApp();
});
