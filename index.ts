import app from './src/app.ts';
import { config } from './src/config/config.ts';
import connectDB from './src/config/db.ts';

const startServer = async () => {
  // connection to DB.
  await connectDB();

  const port = config.port || 5000;
  
  app.listen(port, () => {
    console.log(`The server is running on the ${port} port.`)
  })
}

startServer();