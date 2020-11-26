const { ApolloServer } = require ('apollo-server');
const { PrismaClient } = require('@prisma/client')

const typeDefs = require ('./schema-graphql');
const resolvers = require ('./resolvers');
const { PlanetAPI } = require ('./datasources/planet-api');
const { StationAPI } = require ('./datasources/station-api');

const prisma = new PrismaClient();

const server = new ApolloServer ({
	typeDefs,
	resolvers,
	
	dataSources: () => ({
		planetAPI: new PlanetAPI(),
		
	}),
	
	context: () => ({
		stationAPI: new StationAPI(prisma),
	})
	
});

server.listen ({ port: 4000 })
.then (({ url }) => {
	console.log (`Server ready at ${url}`);
});