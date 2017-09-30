const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()

const schema = require('./schema')

var { graphql, buildSchema } = require('graphql');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get('/photos/:id', function (req, res) {
  graphql(schema, `{photo(id:${req.params.id}){title,albumId,thumbnailUrl}}`).then((response) => {
    res.json(response);
  });
});

app.listen(4000)
console.log('Listening ...')