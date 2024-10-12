import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import registerRoutes from './routes/auth.routes.js'
import loginRoutes from './routes/auth.routes.js'
import logoutRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
const App = express();

dotenv.config();
const PORT = process.env.PORT;

App.listen(PORT, () => {
  console.log("server on port", PORT);
});

App.use(morgan("dev"));
App.use(express.json());

App.use('/',registerRoutes)
App.use('/',loginRoutes)
App.use('/',logoutRoutes)
App.use('/',userRoutes)
