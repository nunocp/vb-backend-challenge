class StationAPI {
	constructor (prismaClient) {
		this.prisma = prismaClient; // isso aqui resolveria o problema dos testes, dai no index tem a inicialização normal também
	}

	async searchByPlanet (planetName) {
		const results = await this.prisma.station.findMany({
			where: {
				planetName: planetName
			}
		});
		return results;
	}

	async addAtPlanet (planetName) {
		const station = await this.prisma.station.create({
			data: { 
				planetName: planetName,
			}
		});
		return station;
	}
}

module.exports = { StationAPI };