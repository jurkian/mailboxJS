angular.module('app')
	.factory('Alert', Alert);

function Alert() {
	// Show alert basing on type and message
	var alert = {};

	var _clear = function() {
		alert = {};
	};

	var _add = function(_type, _msg) {
		_clear();

		// Add new element
		alert.type = _type;
		alert.msg = _msg;
	};

	return {
		add: _add,
		clear: _clear,
		get: function() {
			return alert;
		}
	};
}