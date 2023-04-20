import express from "express";
import cassandra from 'cassandra-driver';

const tourRouter = express.Router();



tourRouter.get("/tour", async (req, res)=>{

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'Trippy'
});
const query = 'SELECT name, address FROM users';
const result = await client.execute(query);
const row = result.first();
console.log(row)
})

export default tourRouter;