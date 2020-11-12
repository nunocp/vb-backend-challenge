const resolvers = {
	// QUERIES
	Query: {
		async suitablePlanets (parent, { page }, { dataSources }) {
			page = page || 1;
			if (page < 1) { page = 1; }

			// How many pages to grab from planetAPI. Must be >= 1.
			const apiPageCount = 10;

			// Calculate page range.
			const firstPage = ((page - 1) * apiPageCount) + 1;
			const lastPage = firstPage + apiPageCount - 1;

			// Send requests.
			var promises = [];
			for (var p = firstPage; p <= lastPage; p++) {
				promises[p-1] = dataSources.planetAPI.getPlanets(p);
			}

			var returnedPromises = await Promise.all (promises);

			// Concat all returned results.
			var allPlanets = [];
			for (var array of returnedPromises) {
				allPlanets = allPlanets.concat (array);
			}

			return allPlanets.filter (
				planet =>
				 	planet.mass // Because some planets can have 'mass' == 'null'.
					&& planet.mass.unit == "M_jup"
					&& planet.mass.value > 25
			);
		},

		async searchPlanet (parent, { planetName }, { dataSources }) {
			var planetsFound = await dataSources.planetAPI.searchPlanet(planetName);
			return planetsFound;
		}
	},

	Planet: {	
		// Just for explicitiness. Function 'name' here is redundant, because default resolver already solves to 'parent.name'.
		name (parent) {
			return parent.name;
		},
		
		mass (parent) {
			return parent.mass.value;
		},

		async hasStation (parent, args, { stationAPI }) {
			const results = await stationAPI.searchByPlanet (parent.name);

			if (results.length > 0) { return true; }
			else { return false; }
		}
	},


	// MUTATIONS
	Mutation: {
		async installStation(parent, { planetName }, { stationAPI }) {
			const entry = await stationAPI.addAtPlanet (planetName);
			return {
				success: true,
				message: `Station added at planet "${entry.planetName}"`,
				planetName: entry.planetName,
				station: entry.id,
			};
		}
	},
};

module.exports = resolvers;