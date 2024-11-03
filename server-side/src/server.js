import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database.js';
import routes from './routes/index.js';

dotenv.config();
const server = express();
// Middleware
server.use(
    express.urlencoded({
        extended: true,
    }),
);
server.use(express.json());
server.use(cors());
server.use(express.static('src/assets'));

// Check db connection
sequelize
    .authenticate()
    .then((res) => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

routes(server);

// Start sever
server.listen(process.env.PORT, () => console.log(`App listen at http://localhost:${process.env.PORT}`));
