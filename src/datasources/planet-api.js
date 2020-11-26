const { RESTDataSource } = require ('apollo-datasource-rest');

class PlanetAPI extends RESTDataSource {
	constructor () {
		super ();
		this.baseURL = 'https://api.arcsecond.io/exoplanets/';
	}

	// aqui dava pra ser (page = 1), daí se você não passa nada, é 1
	async getPlanets (page) {
		page = page || 1;
		if (page < 1) { page = 1; }

		// aqui deveria estar toda aquela lógica que está no resolver

		// não fez muito sentido essa forma de tratar a promise,
		// quando cai no catch é porque deu um erro, então não vai ter result
		// return this.get (`?format=json&page=${page}`)
		// 	.then((response) => {
		// 		return response.results ? response.results : []; 
		// 	})
		// 	.catch((response) => {
		// 		return response.results ? response.results : [];
		// 	});

		// se der algum erro, vai dar throw e acabar a request. Poderia rolar um trycatch aqui pra tratar esse erro
		const planetsResponse = await this.get(`?format=json&page=${page}`);
		return planetsResponse.results ?? [];
	}

	async searchPlanet (planetName) {
		const planetsResponse = await this.get(`?format=json&page=${page}`);
		return planetsResponse.results ?? [];
	}
}

module.exports = { PlanetAPI };