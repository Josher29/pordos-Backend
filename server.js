const dotenv = require("dotenv");
const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");

const swaggerFile = require("./swagger.json");

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

const usersRoutes = require("./routes/users");
const themesRoutes = require("./routes/themes");
const opinionRoutes = require("./routes/opinions");

//Mount routes
server.use(usersRoutes);
server.use(themesRoutes);
server.use(opinionRoutes);
//server.use("/products", productsRoutes);

//Documentation setup
server.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerFile));

server.listen(7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}
   You can find the docs at http://localhost:${process.env.PORT || 7500}/docs`
);

