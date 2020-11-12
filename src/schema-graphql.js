const { gql } = require ('apollo-server');

const typeDefs = gql`
	# === QUERIES ===

	type Query {
		suitablePlanets (page: Int = 1): [Planet!]!
        searchPlanet (planetName: String!): [Planet]!
	}

    type Planet {
        name: String!
        mass: Float!
        hasStation: Boolean
    }

	# === MUTATIONS ===

	type Mutation {
		installStation (planetName: String!): InstallStationResponse!
	}

	type InstallStationResponse {
		success: Boolean!
		message: String
		planetName: String!
        station: ID!
	}
`;

module.exports = typeDefs;