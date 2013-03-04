exports.strToDate = function(dateStr) {
	var match = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
	if (match.length == 4) {
		var dt = new Date();
		dt.setUTCFullYear(match[3]);
		dt.setUTCMonth(match[2] - 1);
		dt.setUTCDate(match[1]);
		return dt;
	}
};
