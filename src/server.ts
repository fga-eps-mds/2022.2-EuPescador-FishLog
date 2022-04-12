import 'reflect-metadata';
import { connection } from './config/database';
import app from './app';

connection
  .initialize()
  .then(() => {
    console.log('Banco conectado');
  })
  .catch((err) => console.log(err));

const serverPort = process.env.PORT || 4001;

app.listen(serverPort, () => {
  console.log(`server running on port 4001`);
});
