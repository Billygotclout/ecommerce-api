const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const User = require("./schemas/User");
const Products = require("./schemas/Product");
const Orders = require("./schemas/Order");
const authPath = require("./Auth/path");
const adminPath = require("./Admin/path");
const productPath = require("./Products/path");
const orderPath = require("./Orders/path");
const payPath = require("./Payments/path");
const wishlistPath = require("./Wishlist/path");
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
      ...adminPath,
      ...authPath,
      ...productPath,
      ...orderPath,
      ...payPath,
      ...wishlistPath,
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
