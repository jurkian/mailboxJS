'use strict';

angular.module('mailboxApp')
	.filter('truncate', function() {
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
	});
