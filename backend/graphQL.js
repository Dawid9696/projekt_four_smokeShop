const { GraphQLServer } = require('graphql-yoga')

const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://dawid:dawid@cluster0.vq1pe.mongodb.net/<dbname>?retryWrites=true&w=majority');
const Smoke = require('./models/Smoke.model')

const resolvers = {
  Query: {
    smokes:() => {return Smoke.find()},
    smoke:(parent,args) => {return Smoke.findById(args.id)}
  },
  Mutation: {
    createSmoke: async (parent, args) =>{
      const newSmoke = new Smoke({
        smokeName: args.smokeName,
        smokePrice: args.smokePrice,
        smokePhoto: args.smokePhoto,
        smokePower: args.smokePower,
        smokeResistance: args.smokeResistance,
        smokeCapacity: args.smokeCapacity,
      })
      const result = await newSmoke.save()
        return result
    },
    deleteSmoke: async (parent, args) =>{
      const smokes = await Smoke.find()
      const deletedSmoke = await Smoke.findByIdAndDelete(args.id)
      return deletedSmoke
    },
    updateSmoke: async (parent, args) =>{
      const updatedSmoke = {
        smokeName: args.smokeName,
        smokePrice: args.smokePrice,
        smokePhoto: args.smokePhoto,
        smokePower: args.smokePower,
        smokeResistance: args.smokeResistance,
        smokeCapacity: args.smokeCapacity,
      }
      const smokeWhichIsUpdated = await Smoke.findByIdAndUpdate(args.id,updatedSmoke)
      return await smokeWhichIsUpdated.save()
    },
  }
}

const server = new GraphQLServer({
  typeDefs:'./schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))