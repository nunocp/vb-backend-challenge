
// não ficou muito legal colocar toda a lógica aqui nos resolvers,
// inclusive tem algumas coisas repetidas, o ideal era tudo isso aqui estar lá no planetApi/stationApi
const resolvers = {
	// QUERIES
	Query: {
		// tem um erro meio grave nessa query, não consegui buscar planetas passando page: 2
		async suitablePlanets (parent, { page }, { dataSources }) {
			page = page || 1;
			if (page < 1) { page = 1; } // essa lógica ta aqui e lá no getPlanets também

			// How many pages to grab from planetAPI. Must be >= 1.
			const apiPageCount = 10;

			// Calculate page range.
			// essa lógica ficou bem complexa, acho que dava pra simplificar bastante
			// vou tentar deixar uma sugestão
			const pages = [...Array(pages).keys()].map(n => n + 1) // essa é uma das formas de implementar um range em javascript
			const returnedPromises = await Promise.all(pages.map(page => dataSources.planetApi.getPlanets(page)))
			// ----- mas seguindo da forma que você fez
			// em javascript é sempre idela utilizar let ao invés de var
			// pra evitar hoisting
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
				planet => // aqui tem um erro um pouco grave, se o planeta é undefined rola um throw ao acessar o .mass
				 	planet.mass // Because some planets can have 'mass' == 'null'.
					&& planet.mass.unit == "M_jup"
					&& planet.mass.value > 25
			);
		},

		// esse ficou bem massa
		async searchPlanet (parent, { planetName }, { dataSources }) {
			return dataSources.planetAPI.searchPlanet(planetName);
		}
	},

	// esses ficaram legais
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
			// entry não ficou muito claro
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