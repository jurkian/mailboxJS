(function() {
	angular.module('app')
		.factory('Alert', Alert);

	function Alert() {
		var alert = {};

		var factory = {
			clear: clear,
			add: add,
			get: get
		};

		return factory;

		////////////

		function clear() {
			alert = {};
		}

		// Show alert basing on type and message
		function add(type, msg) {
			clear();

			// Add new element
			alert.type = type;
			alert.msg = msg;
		}

		function get() {
			return alert;
		}
	}
})();
