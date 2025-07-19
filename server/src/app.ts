import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/' , ( req , res ) => {
  res.status(200).send('Mini event scheduler server is running');
})

app.use( (req , res) => {
  res.status(404).send({ error : 'Not Found'});
})

export default app;