const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);
// define the root resolver
const root= {
    hello: ()=> "Hello Graphql"
}
// graphql route/endpoint
app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue: root,
    graphiql:true
}));
app.listen(4000,()=>{
    console.log('Server running on port 4000')
})