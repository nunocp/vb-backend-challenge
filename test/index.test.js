const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, gql } = require ('apollo-server');

const typeDefs = require ('../src/schema-graphql');
const resolvers = require ('../src/resolvers');

// For testing, connect through 'localhost'.
process.env.DATABASE_URL = 'mysql://root:root@localhost:3306/voltbras?schema=public';

const { PlanetAPI } = require ('../src/datasources/planet-api');
const { StationAPI } = require ('../src/datasources/station-api');

const server = new ApolloServer ({
	typeDefs,
	resolvers,
	dataSources: () => ({
		planetAPI: new PlanetAPI(),
		
	}),	
	context: () => ({
		stationAPI: new StationAPI(),
	})
});

const { query, mutate } = createTestClient(server);


// === TEST: QUERIES ===

test(`First page of 'suitablePlanets' should return more than 0 results`, async () => {
	const res = await query({
		query: `query { suitablePlanets { name, mass, hasStation } }`
	});

	expect(res.data.suitablePlanets.length).toBeGreaterThan(0);
});

test(`Check if returned 'suitablePlanets' meet criteria (mass > 25)`, async () => {
	const res = await query({
		query: `query { suitablePlanets { name, mass, hasStation } }`
	});

	for (var planet of res.data.suitablePlanets) {
		expect(planet.mass).toBeGreaterThan(25);		
	}
});


// === TEST: MUTATIONS ===

const planetName = '1RXS J235133.3+312720 b';
test(`Install station at suitable planet "${planetName}"`, async () => {
	const res = await mutate({
		mutation: `mutation { installStation (planetName:"${planetName}") { success, message, planetName, station } }`
	});

	expect(res.data.installStation.success).toBe(true);
	expect(res.data.installStation.planetName).toBe(planetName);
});