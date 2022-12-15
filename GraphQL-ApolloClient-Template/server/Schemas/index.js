const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const productData = require("../MOCK_DATA.json");

const ProductType = require("./TypeDefs/ProductType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return productData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createproduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        currency: { type: GraphQLString },
        quantity:{type: GraphQLString},
        image: { type: GraphQLString },
        price: { type: GraphQLString },
        availableColors: { type: GraphQLString },
        defaultColor: { type: GraphQLString }
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          name: args.name,
          image: args.image,
          price: args.price,
          quantity:args.quantity,
          availableColors:args.availableColors,
          defaultColor:args.defaultColor,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
