const { PrismaClient } = require('@prisma/client');

class StationAPI {
	constructor (prismaClient) {
		this.prisma = new PrismaClient();
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