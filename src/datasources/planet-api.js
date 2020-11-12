const { RESTDataSource } = require ('apollo-datasource-rest');

class PlanetAPI extends RESTDataSource {
	constructor () {
		super ();
		this.baseURL = 'https://api.arcsecond.io/exoplanets/';
	}

	async getPlanets (page) {
		page = page || 1;
		if (page < 1) { page = 1; }

		return this.get (`?format=json&page=${page}`)
			.then((response) => {
				return response.results ? response.results : []; 
			})
			.catch((response) => {
				return response.results ? response.results : [];
			});
	}

	async searchPlanet (planetName) {
		return this.get (`?format=json&search=${encodeURIComponent(planetName)}`)
			.then((response) => {
				return response.results ? response.results : []; 
			})
			.catch((response) => {
				return response.results ? response.results : [];
			});
	}
}

module.exports = { PlanetAPI };