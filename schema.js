const fetch = require('node-fetch')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const photosApiUrl = "https://jsonplaceholder.typicode.com/photos"

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  description: '...',

  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: json => {
        console.log(json)
        return JSON.parse(json).title
      }
    },
    albumId:{
      type: GraphQLInt,
      resolve: json => {
        console.log(json)
        return JSON.parse(json).albumId
      }
    },
    thumbnailUrl:{
      type: GraphQLString,
      resolve: json => {
        console.log(json)
        return JSON.parse(json).thumbnailUrl
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      photo: {
        type: PhotoType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetch(
          `${photosApiUrl}/${args.id}`
          
        ).then(response => response.text())  
      }
    })
  })
})
