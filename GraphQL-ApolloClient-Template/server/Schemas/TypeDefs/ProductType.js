const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const productType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    currency: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLString },
    sizes:{type: GraphQLString},
    quantity:{type: GraphQLString},
    availableColors:{type: GraphQLString},
    defaultColor:{type: GraphQLString},
  }),
});


module.exports = productType;
