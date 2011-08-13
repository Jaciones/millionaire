function Bonus() {
	this.calculateBonuses = function(venues) {
		var has50Visits = false;
		var has100Visits = false;
		var has3SameTypes = false;
		var has5States = false;

		var types = {};
		var states = [];

		var results = [];

		venues.forEach(function(venue) {
			if (venue.beenHere > 50) {
				has50Visits = true;
				if (venue.beenHere > 100) {
					has100Visits = true;
				}
			}
			// Check Categories
			if (type[venue.venue.categories]) {
				var categroies = venue.venue.categories;
				for (var i = 0; i < categories.length; i++) {
					if (types[categories[i].name]) {
						types[categories[i].name] = types[categories[i].name] + 1;
						if (types[categories[i].name] > 2) {
							has3SameTypes = true;
							break;
						}
					} else {
						types[categories[i].name] = 1;
					}
				}
			}
			// Check States
			if (type[venue.venue.location]) {
				var state = venue.venue.location.state;
				if (state) {
					if (states[state]) {
						states[state] = states[state] + 1;
						if (states[state] > 4) {
							has5States = true;
						}
					} else {
						states[state] = 1;
					}

				}
			}

		})

		if (has50Visits) { results.push(10); }
		if (has100Visits) { results.push(15); }
		if (has3SameTypes) { results.push(10); }
		if (has5States) { results.push(10); }

		return results;
	};
}
exports = module.exports = new Bonus();