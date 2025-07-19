import express from 'express'
import cors from 'cors'
import eventRoutes from './routes/event.routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',eventRoutes);

app.get('/' , ( req , res ) => {
  res.status(200).send('Mini event scheduler server is running');
})

app.use( (req , res) => {
  res.status(404).send({ error : 'Not Found'});
})

export default app;