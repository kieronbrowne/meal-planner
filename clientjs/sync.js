define(
[],

function() {
	var sync = function(method, model) {
		console.log('called sync');
		var ret = [
			{name: 'kieron', id: 1},
			{name: 'francis', id: 2},
			{name: 'browne', id: 3}
		];
		return ret;
	};
});
