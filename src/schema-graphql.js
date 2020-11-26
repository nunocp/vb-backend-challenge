const { gql } = require ('apollo-server');


// ficou bem massa a definição do schema
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
        station: ID! # stationId talvez fosse mais claro
	}
`;

module.exports = typeDefs;