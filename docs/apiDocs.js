const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const User = require("./schemas/User");
const Products = require("./schemas/Product");
const Orders = require("./schemas/Order");
const login = require("./Auth/login");
const register = require("./Auth/register");
const currentUser = require("./Auth/currentUser");
const getAllUsers = require("./Admin/getAllUsers");
const getAllSellers = require("./Admin/getAllSellers");

const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Express API for Ecommerce Application",
      version: "1.0.0",
      description: "This is the REST API for the Ecommerce Application",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Dev server",
      },
    ],
    tags: [
      {
        name: "Admin",
      },
      {
        name: "Auth",
      },
      {
        name: "Payments",
      },
      {
        name: "Products",
      },
      {
        name: "Orders",
      },

      {
        name: "Wishlist",
      },
    ],
    paths: {
      "api/admin/get-all-users": {
        get: getAllUsers,
      },
      "api/admin/get-all-sellers": {
        get: getAllSellers,
      },
      "api/auth/login": {
        post: login,
      },
      "/api/auth/register": {
        post: register,
      },
      "api/auth/current-user": {
        post: currentUser,
      },
    },
    components: {
      schemas: {
        User,
        Products,
        Orders,
      },
    },
  },

  apis: ["../routes/*.routes.js"],
};
const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
