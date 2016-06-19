(function() {
	angular.module('app.dashboard')
		.filter('truncate', truncate);

	function truncate() {
		return function(input, max, tail) {

			if (!input) {
				return '';
			}

			if (!max) {
				return input;
			}

			max = parseInt(max);

			if (input.length <= max) {
				return input;
			}

			input = input.substr(0, max);
			return input + (tail || '…');
		};
	}
})();
